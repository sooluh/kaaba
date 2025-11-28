import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: { target: 'es2020' },
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
})
