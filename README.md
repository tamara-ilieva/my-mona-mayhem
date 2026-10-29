🌐 English | [Español](README.es.md) | [Português (Brasil)](README.pt_BR.md) | [한국어](README.ko.md)

---

# 🎮 Mona Mayhem  
## *Battle Your GitHub Contributions in Retro Glory*

> **Compete, Code, and Conquer** — Build a GitHub Contribution Battle Arena with GitHub Copilot

Welcome to **Mona Mayhem**, an interactive workshop where you'll build a retro arcade-themed website that turns GitHub contribution graphs into an epic competitive showdown. Compare your coding prowess against others in a 1980s arcade aesthetic.

This is your **launchpad** — follow our guided workshop to build a fully functional app step-by-step, leveraging GitHub Copilot's power at every stage.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*The retro arcade battle arena you'll create*

---

## ✨ What You'll Build

- 🎯 **GitHub Battle Arena** — Compare contribution graphs side-by-side
- 🕹️ **Retro Arcade UI** — Pixel-perfect 1980s aesthetic with the Press Start 2P font
- ⚡ **Real-time Data** — Fetch live GitHub contribution data via API
- 🚀 **Full-Stack App** — Learn Astro, Node.js backend, and modern web development
- 🤖 **AI-Powered Development** — Build the entire app using GitHub Copilot

---

## 🎓 The Workshop Path

**Choose your adventure** — Two fully-supported tracks tailored to your workflow:

### 🖥️ VS Code Track
Use GitHub Copilot directly in your editor with Chat, Plan Mode, Agent Mode, and visual debugging.

### 💻 CLI Track  
Leverage the power of terminal-based development with GitHub Copilot CLI, autonomous agents, and batch operations.

### 📖 Curriculum

| Part | Milestone | What You'll Learn |
|------|-----------|-------------------|
| [**00**](workshop/00-overview.md) | 🎬 **Overview** | Choose your path and set learning goals |
| [**01**](workshop/01-setup.md) | ⚙️ **Setup & Context** | Configure Copilot, set up permissions and environment |
| [**02**](workshop/02-plan-and-scaffold.md) | 🏗️ **Plan & Scaffold** | Design your API and page architecture with AI guidance |
| [**03**](workshop/03-agent-mode.md) | 🚀 **Build the Game** | Leverage AI agents to implement core features iteratively |
| [**04**](workshop/04-design-vibes.md) | 🎨 **Design & Theme** | Create retro arcade aesthetics with AI-assisted design |
| [**05**](workshop/05-polish.md) | ✨ **Polish & Deploy** | Refine, review, and parallelize work for production |
| [**06**](workshop/06-bonus.md) | 🏆 **Bonus Features** | Extend your app with creative ideas and advanced Copilot tricks |

---

## 🚀 Get Started in 3 Steps

### 1️⃣ **Set Up Your Repository**
Choose one:
- Click **[Use this template](https://github.com/new?template_name=my-mona-mayhem&template_owner=tamara-ilieva)** to create your own copy, or
- Fork this repository to your GitHub account

### 2️⃣ **Choose Your Track**

<table>
  <tr>
    <th>🖥️ VS Code</th>
    <th>💻 CLI</th>
  </tr>
  <tr>
    <td>Clone your repo and open in VS Code v1.107+</td>
    <td>Clone your repo locally and install GitHub Copilot CLI</td>
  </tr>
  <tr>
    <td><code>npm install</code> + <code>npm run dev</code></td>
    <td><code>npm install</code> + start with <code>copilot</code></td>
  </tr>
</table>

### 3️⃣ **Follow the Workshop**
Head to **[Part 00: Overview](workshop/00-overview.md)** and start building! 🎮

---

## ✅ Requirements

### 📋 Everyone Needs
- ✔️ **GitHub Copilot** (Pro, Business, or Enterprise)
- ✔️ **Git** for version control
- ✔️ **Node.js 18+** for runtime

### 🖥️ For VS Code Track
- ✔️ **VS Code v1.107+**
- ✔️ **GitHub Copilot Extension** (signed in)

### 💻 For CLI Track
- ✔️ **GitHub Copilot CLI** (`copilot`)
- ✔️ **Node.js 22+** (recommended for CLI installation via npm)
- *or* **Homebrew/WinGet** for native package installation

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Framework** | [Astro v6](https://astro.build/) — The web framework for content-driven sites |
| **Runtime** | [Node.js](https://nodejs.org/) with [@astrojs/node adapter](https://docs.astro.build/en/guides/integrations-guide/node/) |
| **API** | GitHub's contribution graph data |
| **Styling** | Retro arcade aesthetic with [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font |
| **AI** | GitHub Copilot for AI-assisted development |

---

## 🧹 Maintain Code Quality

Keep your code clean and consistent:

```bash
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix issues
npm run build      # Verify Astro/TypeScript compilation
```

**What's enforced:** No unused variables, single quotes, semicolons, trailing commas, and braces around control-flow bodies. ESLint excludes build output and generated files.

**Pro tip:** Run `npm run lint` and `npm run build` before committing changes.

---

## 📦 Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local dev server (localhost:3000)
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run astro -- <args>  # Run Astro CLI directly
```

---

## 🚢 Deployment

### Current Setup: GitHub Pages (Static Content)
The included GitHub Actions workflow deploys docs and workshop content to GitHub Pages. The Astro app is **not** deployed.

### Deploy the Astro App to GitHub Pages (Static)
To make the battle arena go live on GitHub Pages:

1. **Switch to static output** in `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     output: 'static',  // Change from 'server'
     // ... rest of config
   });
   ```

2. **Remove the Node adapter** from `astro.config.mjs` and `package.json`

3. **Update the GitHub Actions workflow** to build and upload `dist/` as the Pages artifact

4. **For project pages** (`https://<user>.github.io/<repo>/`), set `site` and `base` in `astro.config.mjs`

### Keep API Routes Running (Recommended)
For the full battle arena experience with live GitHub data, deploy to a Node-capable platform:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- Or any Node.js hosting service

---

## 📄 License

[MIT License](LICENSE) — Use freely in your projects!

---

## 🎯 What's Next?

Ready to build? Start with **[Workshop Part 00: Overview](workshop/00-overview.md)** and let GitHub Copilot guide you through each step.

**Questions?** Check out the [workshop documentation](workshop/) or open an issue on GitHub.

Happy coding! 🎮✨
