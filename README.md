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

All portfolio **content** lives in one file at the repo root: **`profile.json`**. The Vue app imports it at **build time** via the `@profile` alias — do not duplicate projects or skills in components.

After deploy: **https://mdarh.github.io/profile.json** (root file + `public/profile.json` symlink copied into `dist/` on build). The `MDARH/MDARH` README generator (or any consumer) should fetch that URL.

Validate before build: `npm run validate:profile` (also runs in `build:pages`). Machine-readable JSON Schema: `profile.schema.json`.

### Locked schema (root object only)

```json
{
  "name": "string",
  "title": "string",
  "bio": "string",
  "email": "string | null",
  "links": { "github": "string (required)", "linkedin?": "string", "website?": "string", "...": "string" },
  "skills": [{ "name": "string", "category": "string", "level": "0-100" }],
  "projects": [{
    "name": "string",
    "description": "string",
    "tech": ["string"],
    "repo_url": "string | null",
    "live_url": "string | null",
    "private": "boolean",
    "status": "live | in-progress | planned",
    "featured": "boolean",
    "visible": "boolean",
    "image": "string | null"
  }]
}
```

**Rules for private repos:** set `private: true` and `repo_url: null`. The site never renders a repo link when `private` is true.

**Site rendering:** projects with `visible: false` are omitted; featured items appear first; status badges (Live / In progress / Planned); if `private` and no `live_url`, show a Private badge.

Experience page copy is in `src/data/experience.json` (not part of `profile.json`).

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