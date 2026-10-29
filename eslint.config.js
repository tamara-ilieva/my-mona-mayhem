import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended.map(config => ({
		...config,
		files: ['**/*.{ts,tsx,astro}', '**/*.astro/*.js'],
	})),
	...astro.configs['flat/recommended'],
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
	{
		files: ['docs/**/*.js', '**/*.astro/*.{js,ts}'],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ['docs/**/*.js'],
		languageOptions: {
			sourceType: 'script',
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'no-unused-vars': ['error', { args: 'all', caughtErrors: 'all' }],
			'no-var': 'error',
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/eol-last': ['error', 'always'],
		},
	},
	{
		files: ['**/*.{ts,tsx,astro}', '**/*.astro/*.js'],
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { args: 'all', caughtErrors: 'all' }],
		},
	},
	{
		files: ['**/*.astro/*.{js,ts}'],
		rules: {
			'@stylistic/eol-last': 'off',
		},
	},
];
