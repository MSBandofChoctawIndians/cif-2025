# Choctaw Indian Fair 2025 Website

This is the official website for the 75th Choctaw Indian Fair, built using Astro, React, and Tailwind CSS.

## 🚀 Project Structure

Inside this project, you'll find the following folders and files:

```text
/
├── public/
│   ├── fairlogo.webp
│   ├── favicon.svg
│   └── navlogo.webp
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Nav.jsx
│   │   ├── SaveTheDate.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .vscode/
│   ├── extensions.json
│   └── launch.json
├── .astro/
│   ├── content-assets.mjs
│   ├── content-modules.mjs
│   ├── content.d.ts
│   ├── data-store.json
│   ├── settings.json
│   ├── types.d.ts
│   └── collections/
├── .gitignore
├── .prettierrc
├── astro.config.mjs
├── old_README.md
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                       |
| :------------------------ | :------------------------------------------- |
| `npm install`             | Installs dependencies                        |
| `npm run dev`             | Starts local dev server at localhost:4321    |
| `npm run build`           | Build your production site to ./dist/        |
| `npm run preview`         | Preview your build locally, before deploying |
| `npm run astro ...`       | Run CLI commands like astro add, astro check |
| `npm run astro -- --help` | Get help using the Astro CLI                 |
