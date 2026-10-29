# 🏗️ Mona Mayhem - Architecture Diagrams

## 1. System Architecture Overview

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                                    │
│  (User accesses http://localhost:3000 or deployed URL)                    │
└─────────────────────────────────────────┬─────────────────────────────────┘
                                          │
                    ┌─────────────────────▼──────────────────────┐
                    │   ASTRO FILE-BASED ROUTER (localhost:3000) │
                    │  (Handles all incoming HTTP requests)      │
                    └─────┬──────────────────────┬────────────────┘
                          │                      │
        ┌─────────────────▼────────┐  ┌─────────▼──────────────────┐
        │   Static Pages           │  │   API Endpoints            │
        │   (Pre-rendered/SSR)     │  │   (Dynamic/Runtime)        │
        │                          │  │                            │
        │  GET / → index.astro     │  │  GET /api/contributions/   │
        │  ✅ Renders HTML         │  │      [username] → .ts      │
        │     (Landing Page)       │  │  ⏳ Currently: 501 error    │
        └──────────────────────────┘  └─────────┬──────────────────┘
                                                 │
                                    ┌────────────▼─────────────┐
                                    │  GITHUB API (External)   │
                                    │  - Fetch contribution    │
                                    │    data for users        │
                                    │  - Return JSON response  │
                                    └──────────────────────────┘
```

---

## 2. Project Directory Structure

```
my-mona-mayhem/
│
├── src/                              ← Source code
│   └── pages/                        ← File-based routing (Astro)
│       ├── index.astro              ← Main landing page
│       │   └── Returns HTML with "Welcome to Mona Mayhem"
│       │
│       └── api/                     ← API routes
│           └── contributions/
│               └── [username].ts    ← Dynamic endpoint
│                   └── GET handler (returns 501 - Not Implemented)
│
├── public/                          ← Static assets (favicon, images, etc.)
├── dist/                            ← Production build output (generated)
├── docs/                            ← Documentation
├── workshop/                        ← Workshop learning materials
│   ├── 00-overview.md
│   ├── 01-setup.md
│   ├── 02-plan-and-scaffold.md
│   ├── 03-agent-mode.md
│   ├── 04-design-vibes.md
│   ├── 05-polish.md
│   └── 06-bonus.md
│
├── astro.config.mjs                ← Astro configuration
│                                    (server mode + Node adapter)
├── tsconfig.json                   ← TypeScript configuration
├── eslint.config.js                ← ESLint code quality rules
├── package.json                    ← Dependencies & scripts
├── package-lock.json               ← Locked dependency versions
│
└── AGENTS.md                       ← Development workflow guide
    ARCHITECTURE.md                 ← This file!
    README.md                       ← Project overview
```

---

## 3. Request-Response Flow Diagram

### 3.1 Landing Page Request

```
Browser                    Astro Router              index.astro
  │                            │                         │
  │  GET /                     │                         │
  ├──────────────────────────→│                         │
  │                            │                         │
  │                            │ Load component          │
  │                            ├────────────────────────→│
  │                            │                         │
  │                            │                         │
  │                            │ Returns HTML            │
  │                            │←────────────────────────┤
  │                            │                         │
  │ HTML response (200)        │                         │
  │←──────────────────────────┤                         │
  │                            │                         │
  └─ Display: "Mona Mayhem"    │                         │
     "Welcome to..." message   │                         │
```

### 3.2 API Request Flow

```
Browser                 Astro Router           [username].ts            GitHub API
  │                          │                      │                       │
  │  GET /api/contributions/ │                      │                       │
  │      john               │                      │                       │
  ├─────────────────────────→│                      │                       │
  │                          │                      │                       │
  │                          │ Route match          │                       │
  │                          ├─────────────────────→│                       │
  │                          │                      │                       │
  │                          │                      │ Fetch contribution    │
  │                          │                      │ data for "john"       │
  │                          │                      ├──────────────────────→│
  │                          │                      │                       │
  │                          │                      │ Return contribution   │
  │                          │                      │ graph data            │
  │                          │                      │←──────────────────────┤
  │                          │                      │                       │
  │                          │ Returns JSON         │                       │
  │                          │←─────────────────────┤                       │
  │                          │                      │                       │
  │ JSON response (200)      │                      │                       │
  │←─────────────────────────┤                      │                       │
  │                          │                      │                       │
  └─ { data: { ... } }       │                      │                       │
     (parsed by frontend JS) │                      │                       │
```

---

## 4. Technology Stack & Layer Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER (Browser)                                     │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ HTML / CSS / JavaScript                                    │  │
│ │ • Retro Arcade UI (Press Start 2P font)                   │  │
│ │ • Battle Arena Display                                    │  │
│ │ • User Input Handling                                     │  │
│ └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                            ▲
                            │ HTTP/JSON
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ APPLICATION LAYER (Astro + Node.js)                              │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ File-Based Routing                                         │  │
│ │ • src/pages/index.astro       → GET /                     │  │
│ │ • src/pages/api/.../*.ts      → GET /api/...              │  │
│ │                                                            │  │
│ │ Server-Side Features:                                      │  │
│ │ • Data fetching (in .astro frontmatter)                   │  │
│ │ • Server-side rendering                                  │  │
│ │ • API endpoints with APIRoute                            │  │
│ │ • TypeScript type safety                                 │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ Runtime: Node.js with @astrojs/node adapter                     │
│ Mode: Standalone server (not serverless)                        │
│ Config: output: 'server' in astro.config.mjs                    │
└──────────────────────────────────────────────────────────────────┘
                            ▲
                            │ HTTP
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ EXTERNAL SERVICES LAYER                                          │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ GitHub API (github.com/api/v3)                            │  │
│ │ • Contribution graph data                                 │  │
│ │ • User profile information                                │  │
│ │ • Rate-limited public access                              │  │
│ └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. File Routing Mechanism

```
File System Path              URL Route                  Handler Type
─────────────────────────────────────────────────────────────────
src/pages/index.astro         /                          Page Component
                              Returns HTML

src/pages/api/                /api/                      (Folder, not routable)
                              
src/pages/api/contributions/  /api/contributions/        (Folder, not routable)
[username].ts
                              /api/contributions/john    API Endpoint
                              /api/contributions/jane    (Dynamic via [username])
                              Returns JSON (APIRoute)
```

**Dynamic Segment:** `[username]` captures the parameter
- Request: `GET /api/contributions/alice`
- Captures: `username = "alice"`
- Accessible in handler via Astro params

---

## 6. Build & Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                         │
└─────────────────────────────────────────────────────────────────┘

Developer edits code
        │
        ▼
┌─────────────────────────────┐
│ npm run dev                 │
│ (Astro dev server)          │
│ localhost:3000              │
├─────────────────────────────┤
│ • Hot Module Reload         │
│ • Error overlay             │
│ • TypeScript checking       │
└────────────┬────────────────┘
             │
             ▼
Browser sees updates immediately
             │
             ▼
┌─────────────────────────────┐
│ npm run lint                │  Before committing:
│ (ESLint check)              │  1. Run linter
├─────────────────────────────┤  2. Run build
│ • No unused variables       │  3. Check for errors
│ • Single quotes             │  4. Commit with clean state
│ • Semicolons & trailing     │
│   commas enforced           │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ npm run build               │
│ (Production build)          │
├─────────────────────────────┤
│ • TypeScript compilation    │
│ • Astro bundling            │
│ • Output to dist/           │
│ • Catches build errors      │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ npm run preview             │
│ (Test production build)     │
│ localhost:3000 (production) │
├─────────────────────────────┤
│ • Simulates deployment      │
│ • Verifies everything works │
└─────────────────────────────┘
```

---

## 7. Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT OPTIONS                            │
└──────────────────────────────────────────────────────────────────┘

RECOMMENDED: Node.js Hosting (Full Features)
───────────────────────────────────────────
npm run build
        │
        ▼
dist/ folder (production build)
        │
        ├─→ Deploy to: Vercel / Netlify / Railway / etc.
        │
        ▼
Production Server (Node.js)
        │
        ├─→ Serves static assets (index.html, CSS, JS)
        ├─→ Routes HTTP requests via Astro router
        └─→ Executes API endpoints at runtime
                │
                ├─→ /             → index page
                └─→ /api/...      → Dynamic API responses


ALTERNATIVE: Static Hosting (Limited Features)
────────────────────────────────────────────────
Changes needed:
  1. astro.config.mjs: output: 'static' (instead of 'server')
  2. Remove @astrojs/node adapter
  3. API routes no longer work (becomes static JSON files)

Then deploy to:
  • GitHub Pages
  • Vercel (static mode)
  • Netlify (static mode)
  
Limitations:
  ✗ No runtime data fetching
  ✗ No dynamic API endpoints
  ✓ Lower hosting costs
  ✓ Faster CDN delivery
```

---

## 8. Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        index.astro                             │
│                     (Landing Page)                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Frontmatter (runs on server):                           │  │
│  │ • Data fetching (optional)                              │  │
│  │ • Authentication checks                                 │  │
│  │ • Variable setup                                        │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ HTML Template:                                          │  │
│  │ • <h1>Mona Mayhem</h1>                                  │  │
│  │ • Welcome text                                          │  │
│  │ • (Future: Battle Arena Components)                     │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ▼
              Browser renders HTML + CSS


┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│          [username].ts (API Endpoint Handler)                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ export const prerender = false;                         │  │
│  │ (Forces runtime execution, no static generation)        │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ export const GET: APIRoute = (context) => {             │  │
│  │   const { username } = context.params;                  │  │
│  │                                                         │  │
│  │   // TODO: Fetch GitHub data                           │  │
│  │   // TODO: Return structured response                  │  │
│  │                                                         │  │
│  │   return new Response(JSON, {                           │  │
│  │     status: 501,                                        │  │
│  │     headers: { 'Content-Type': 'application/json' }     │  │
│  │   });                                                   │  │
│  │ }                                                       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Execution Context:                                            │
│  • Only runs at request time (not build time)                  │
│  • Has access to HTTP context (params, headers, body, etc.)    │
│  • Can call external APIs (GitHub)                             │
│  • Returns JSON or other Response formats                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ▼
              Browser receives JSON response
```

---

## 9. Data Flow: Battle Arena Concept

```
Step 1: User enters two GitHub usernames
        │
        ▼
Step 2: Frontend sends HTTP requests
        ├─→ GET /api/contributions/alice
        └─→ GET /api/contributions/bob
        │
        ▼
Step 3: API handlers fetch from GitHub
        ├─→ GitHub API: alice's contribution data
        └─→ GitHub API: bob's contribution data
        │
        ▼
Step 4: Convert to JSON responses
        ├─→ { contributions: [...], stats: {...} }
        └─→ { contributions: [...], stats: {...} }
        │
        ▼
Step 5: Frontend receives both responses
        │
        ▼
Step 6: Render side-by-side comparison
        ├─→ alice's contribution graph (left)
        ├─→ bob's contribution graph (right)
        └─→ Battle stats display
        │
        ▼
Browser displays retro arcade battle arena
with Press Start 2P font, pixel art, etc.
```

---

## 10. Technology Stack Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                       TECH STACK                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend Framework:     Astro v6                              │
│  Runtime:               Node.js (v18+)                         │
│  Adapter:               @astrojs/node (standalone mode)         │
│  Language:              TypeScript (~5.9.3)                     │
│  Linting:               ESLint 10.13.0                          │
│                         @stylistic/eslint-plugin               │
│                         eslint-plugin-astro                    │
│  Styling:               CSS (retro arcade design)              │
│  Font:                  Press Start 2P (Google Fonts)          │
│                                                                 │
│  External Service:      GitHub Contribution API                │
│                                                                 │
│  Development:           npm scripts                            │
│  Package Manager:       npm                                     │
│  Build Tool:            Astro (built-in bundler)               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Workshop Learning Path

```
┌──────────────────────────────────────────────────────────────────┐
│                    6-PART WORKSHOP CURRICULUM                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Part 00: Overview                                              │
│  └─→ Choose VS Code or CLI track                               │
│      Set learning goals                                         │
│                                                                  │
│  Part 01: Setup & Context                                       │
│  └─→ Configure GitHub Copilot                                  │
│      Set up environment variables                               │
│      Verify Node.js & npm installation                          │
│                                                                  │
│  Part 02: Plan & Scaffold                                       │
│  └─→ Design API endpoints                                       │
│      Plan page architecture                                     │
│      Create folder structure                                    │
│                                                                  │
│  Part 03: Agent Mode - Build the Game                          │
│  └─→ Implement GitHub data fetching                             │
│      Build API response handlers                                │
│      Create battle logic                                        │
│                                                                  │
│  Part 04: Design & Theme                                        │
│  └─→ Add retro arcade aesthetics                                │
│      Integrate Press Start 2P font                              │
│      Create pixel art elements                                  │
│      Style battle arena display                                 │
│                                                                  │
│  Part 05: Polish & Deploy                                       │
│  └─→ Run npm run lint & npm run build                           │
│      Test on preview server                                     │
│      Deploy to production                                       │
│      Performance optimization                                   │
│                                                                  │
│  Part 06: Bonus Features                                        │
│  └─→ Add advanced Copilot tricks                                │
│      Extend with custom features                                │
│      Community challenges                                       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 12. Key Architectural Decisions

| Decision | Rationale | Implications |
|----------|-----------|--------------|
| **Astro Framework** | Fast, content-driven site builder with minimal JS | Excellent for hybrid pages (SSR + static) |
| **Server Output Mode** | Enables runtime API endpoints | Requires Node.js hosting (can't use static hosts) |
| **File-Based Routing** | No router config needed; files = routes | Intuitive, scales well with more pages |
| **TypeScript** | Type safety for API handlers | Catches errors at build time |
| **ESLint Enforcement** | Consistent code quality | Prevents commits with style violations |
| **Dynamic API Routes** | Request-time execution via prerender=false | Can fetch live GitHub data |
| **Press Start 2P Font** | Retro arcade aesthetic | Unique visual identity |
| **Workshop Format** | Guided learning with Copilot assistance | Teaches both coding and AI-assisted development |

---

## 13. Current Status & Next Steps

```
✅ COMPLETED
├─ Astro + Node.js infrastructure
├─ File-based routing setup
├─ Landing page (index.astro)
├─ API endpoint skeleton ([username].ts)
└─ Development workflow (dev, build, lint)

⏳ IN PROGRESS / TODO
├─ Implement GET handler for GitHub data fetching
├─ Create battle arena UI components
├─ Add retro arcade styling (CSS)
├─ Integrate Press Start 2P font
├─ Build comparison logic
├─ Deploy to production
└─ Add bonus features

🔗 DEPENDENCIES
└─ All tasks depend on successful npm install
   and Astro dev server startup
```

---

**Last Updated:** October 29, 2026

For more details, see:
- [README.md](/home/tamara/Desktop/my-mona-mayhem/README.md)
- [AGENTS.md](/home/tamara/Desktop/my-mona-mayhem/AGENTS.md)
- [astro.config.mjs](/home/tamara/Desktop/my-mona-mayhem/astro.config.mjs)
