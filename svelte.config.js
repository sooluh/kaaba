import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
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
