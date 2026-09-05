// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// 301 map: legacy drbrianbrooks.com URL paths -> new equivalents (SEO preservation).
// Mirrored in vercel.json for true edge 301s in production.
const legacyRedirects = {
  '/meet-our-provider': '/doctors',
  '/meet-our-team': '/team',
  '/your-first-visit': '/new-patients',
  '/financial-information': '/new-patients',
  '/online-forms': '/new-patients',
  '/appointments': '/contact',
  '/general-dentistry': '/services/general-dentistry',
  '/cosmetic-dentistry': '/services/cosmetic-dentistry',
  '/restorative-dentistry': '/services/restorative-dentistry',
  '/periodontal-services': '/services/periodontal-services',
  '/pediatric-dentistry': '/services/pediatric-dentistry',
  '/orthodontic-services': '/services/orthodontic-services',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://overlakefamilydentistry.com',

  redirects: legacyRedirects,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), mdx(), sitemap()]
});