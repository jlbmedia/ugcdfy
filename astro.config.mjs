import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://facelessai.pages.dev',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind({
      applyBaseStyles: true
    })
  ]
});
