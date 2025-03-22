// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://msbandofchoctawindians.github.io",
  base: "cif-2025",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
