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

## 🔄 Making Updates

### Adding New Projects

1. Add project images to `src/assets/projects/<project-name>/`
2. Update the projects array in `HomeView.vue`:
   ```javascript
   projects: [
     {
       title: "New Project",
       description: "Project description",
       image: "/src/assets/projects/new-project/image.png",
       tags: ["Vue.js", "Tailwind CSS"]
     }
   ]
   ```

### Updating Skills

Modify the skills array in `HomeView.vue`:
```javascript
skills: [
  { name: "New Skill", level: 85 }
]
```

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

1. Edit content in `src/data/portfolio.json` (projects, skills, contact).
2. Run `npm install` then `npm run build:pages` — this builds with Vite and copies `dist/` to the repo root (`index.html`, `404.html`, `assets/`).
3. Commit and push to `master`.

`index.vite.html` is the Vite dev entry; `index.html` at the root is the production bundle (do not edit by hand).

### Optional GitHub Actions deploy

`.github/workflows/deploy-pages.yml` builds on push to `master` and deploys via GitHub Actions. To use it, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Until then, keep using branch deployment from `master` / root as today.

The Cloudflare DNS Generator lives at `/CloudflareDNSGenerator/` from a separate repo; this workflow only updates the portfolio root and does not touch that path.