# Personal Portfolio - Vue.js & Tailwind CSS

A modern, responsive portfolio website built with Vue.js 3 and Tailwind CSS, featuring interactive particle effects and dark mode support.

## 🚀 Features

- ⚡️ Vue 3 + Vite for rapid development
- 🎨 Tailwind CSS for styling
- 🌓 Dark/Light mode with system preference detection
- ✨ Interactive particle background
- 📱 Fully responsive design
- 🎯 Animated skill progress bars
- 🖼️ Project showcase with hover effects
- 🏷️ Project technology tags

## 🛠️ Tech Stack

- [Vue.js 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Pinia](https://pinia.vuejs.org/) - State management
- [@tsparticles/vue3](https://particles.js.org/) - Particle effects
- [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## 📦 Project Structure

```
Portfolio/
├── src/
│   ├── assets/          # Static assets (images, styles)
│   │   ├── profile/     # Profile images
│   │   └── projects/    # Project screenshots
│   ├── components/      # Reusable Vue components
│   │   ├── LeftSideBar/
│   │   └── RightSideBar/
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   └── views/          # Page components
├── public/            # Public static assets
└── index.html         # Entry HTML file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production
   ```bash
   npm run build
   # or
   yarn build
   ```

## Profile data (`profile.json`)

All portfolio **content** lives in one file at the repo root: **`profile.json`**. The Vue app imports it at **build time** via the `@profile` alias (see `vite.config.js`) — do not duplicate projects or skills inside components.

After deploy, the same file is public at **https://mdarh.github.io/profile.json** (committed at the repo root; also copied into `dist/` via `public/profile.json`). Other repos (e.g. `MDARH/MDARH` profile README) can fetch that URL in a GitHub Action to regenerate skills/projects sections.

### Schema (version 1)

| Field | Type | Description |
|--------|------|-------------|
| `schemaVersion` | number | Currently `1` |
| `profile.name` | string | Display name (hero) |
| `profile.title` | string | Job / role line |
| `profile.description` | string | Short bio |
| `profile.descriptions` | string[] | Rotating hero typewriter lines |
| `profile.skills` | `{ name, level }[]` | Skill bars (`level` 0–100) |
| `contact.email` | string | Email address |
| `contact.phone` | string | Phone (optional display) |
| `contact.social` | `{ platform, link, username, icon }[]` | Social links |
| `projects[]` | object[] | Project cards (see below) |
| `experience` | object | Experience page sections (optional for site; not required for profile README consumers) |

Each **`projects[]`** entry:

| Field | Type | Description |
|--------|------|-------------|
| `id` | number | Stable id |
| `title` | string | Project name |
| `description` | string | Short summary |
| `technologies` | string[] | Tech tags |
| `link` | string | Live site URL, or `#` if none |
| `image` | string | Path from site root (e.g. `./images/projects/...` or `./images/default-project-thumbnail.svg`) |
| `github` | string | Public repo URL or `#` |
| `featured` | boolean | Show on homepage |
| `active` | boolean | If true, show “View Live” when `link` is valid |
| `features` | string[] | Bullet list for project modal |

## 🔄 Making Updates

### Projects, skills, contact, bio

Edit **`profile.json`**, then run `npm run build:pages` and commit the updated root assets plus `profile.json`.

### Project screenshots

Add images under `images/projects/<name>/` and set the project's `image` field in `profile.json`.

### Customizing Particle Effects

The particle configuration can be found in the `HomeView.vue` file. Refer to the [tsParticles documentation](https://particles.js.org/) for available options.

### Modifying Color Scheme

1. Update the Tailwind configuration in `tailwind.config.js`
2. Modify color classes in components
3. Update dark mode colors in respective components

### Adding New Pages

1. Create a new Vue component in `src/views/`
2. Add the route in `src/router/index.js`:
   ```javascript
   {
     path: '/new-page',
     name: 'new-page',
     component: () => import('../views/NewPage.vue')
   }
   ```

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain dark mode support
- Keep responsive design in mind
- Use existing components when possible

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `package.json` - Project dependencies and scripts

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 🔍 Future Improvements

- [ ] Add blog section
- [ ] Implement contact form
- [ ] Add animations for page transitions
- [ ] Integrate with a CMS for easier content updates
- [ ] Add multilingual support
- [ ] Implement SEO optimization
- [ ] Add unit tests
- [ ] Add CI/CD pipeline

## 📞 Support

For support, email mdarh411@gmail.com or open an issue in the repository.

## GitHub Pages deployment

This repository serves the **built** site from the `master` branch root (https://mdarh.github.io).

1. Edit content in **`profile.json`** (projects, skills, contact, bio).
2. Run `npm install` then `npm run build:pages` — this builds with Vite and copies `dist/` to the repo root (`index.html`, `404.html`, `assets/`).
3. Commit and push to `master`.

`index.vite.html` is the Vite dev entry; `index.html` at the root is the production bundle (do not edit by hand).

### Optional GitHub Actions deploy

`.github/workflows/deploy-pages.yml` builds on push to `master` and deploys via GitHub Actions. To use it, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Until then, keep using branch deployment from `master` / root as today.

The Cloudflare DNS Generator lives at `/CloudflareDNSGenerator/` from a separate repo; this workflow only updates the portfolio root and does not touch that path.