import type { APIRoute } from 'astro';

export const prerender = false;

// Cache structure: Map<username, { data: any, timestamp: number }>
const contributionCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

// Validate GitHub username format
function isValidUsername(username: string): boolean {
	if (!username || username.length === 0 || username.length > 39) {
		return false;
	}
	// GitHub usernames: alphanumeric and hyphens only, cannot start/end with hyphen
	return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username);
}

// Get cached data if still valid
function getCachedData(username: string): unknown | null {
	const normalized = username.toLowerCase();
	const cached = contributionCache.get(normalized);

	if (!cached) {
		return null;
	}

	const age = Date.now() - cached.timestamp;
	if (age > CACHE_TTL_MS) {
		contributionCache.delete(normalized);
		return null;
	}

	return cached.data;
}

// Store data in cache
function setCachedData(username: string, data: unknown): void {
	const normalized = username.toLowerCase();
	contributionCache.set(normalized, {
		data,
		timestamp: Date.now(),
	});
}

// Fetch contribution data from GitHub
async function fetchContributions(username: string): Promise<unknown> {
	const url = `https://github.com/${username}.contribs`;

	try {
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'GitHub-Contribution-Proxy/1.0',
			},
			signal: AbortSignal.timeout(10000), // 10 second timeout
		});

		if (response.status === 404) {
			throw {
				status: 404,
				message: 'User not found on GitHub',
			};
		}

		if (response.status === 429) {
			throw {
				status: 429,
				message: 'GitHub API rate limit exceeded',
			};
		}

		if (!response.ok) {
			throw {
				status: response.status,
				message: `GitHub returned status ${response.status}`,
			};
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle timeout
		if (error instanceof Error && error.name === 'AbortError') {
			throw {
				status: 503,
				message: 'GitHub request timed out',
			};
		}

		// Re-throw structured errors
		if (error && typeof error === 'object' && 'status' in error) {
			throw error;
		}

		// Network or parsing errors
		throw {
			status: 503,
			message: 'Failed to fetch data from GitHub',
		};
	}
}

export const GET: APIRoute = async ({ params, url }) => {
	const username = params.username as string;
	const shouldRefresh = url.searchParams.has('refresh');

	// Validate username
	if (!isValidUsername(username)) {
		return new Response(
			JSON.stringify({
				error: 'Invalid username',
				message: 'Username must be 1-39 characters, alphanumeric and hyphens only',
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	try {
		// Check cache unless refresh is requested
		if (!shouldRefresh) {
			const cached = getCachedData(username);
			if (cached !== null) {
				return new Response(JSON.stringify(cached), {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
						'X-Cache': 'HIT',
					},
				});
			}
		}

		// Fetch fresh data
		const data = await fetchContributions(username);

		// Store in cache
		setCachedData(username, data);

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'X-Cache': 'MISS',
			},
		});
	} catch (error) {
		// Handle known error types
		if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
			const { status, message } = error as { status: number; message: string };
			return new Response(
				JSON.stringify({
					error: 'Failed to fetch contributions',
					message,
				}),
				{
					status,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		// Unexpected error
		return new Response(
			JSON.stringify({
				error: 'Internal server error',
				message: 'An unexpected error occurred',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
};
