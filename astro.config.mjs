import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.supardi.dev",
  integrations: [solidJs(), tailwind(), sitemap()],
  experimental: {
    assets: true
  }
});