import preprocess from 'svelte-preprocess'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    }),
  ],
  kit: {
    adapter: adapter(),
    alias: {
      $assets: 'src/assets',
      $components: 'src/components',
      $routes: 'src/routes',
      $params: 'src/params',
    },
  },
}

export default config
