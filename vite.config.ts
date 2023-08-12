import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [sveltekit()],
  build: { target: 'es2020' },
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
})
