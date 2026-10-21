import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://mpasi-bergizi.vercel.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  output: 'static',
  vite: {
    define: {
      'process.env.NOTION_TOKEN': JSON.stringify(process.env.NOTION_TOKEN || env.NOTION_TOKEN || ''),
      'process.env.NOTION_DATABASE_ID': JSON.stringify(process.env.NOTION_DATABASE_ID || env.NOTION_DATABASE_ID || ''),
      'process.env.PUBLIC_SITE_URL': JSON.stringify(process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || 'https://mpasi-bergizi.vercel.app'),
    },
  },
});

