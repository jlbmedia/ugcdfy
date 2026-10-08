import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ugcdfy.com',
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
