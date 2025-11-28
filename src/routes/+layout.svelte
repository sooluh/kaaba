<script lang="ts">
  import '../app.css'

  import { beforeNavigate } from '$app/navigation'
  import { browser } from '$app/environment'
  import { updated } from '$app/stores'
  import { onMount } from 'svelte'

  let theme: 'light' | 'dark' = 'light'

  const applyTheme = (value: 'light' | 'dark') => {
    theme = value
    if (!browser) return
    const root = document.documentElement
    root.classList.toggle('dark', value === 'dark')
    root.dataset.theme = value
    localStorage.setItem('theme', value)
  }

  const toggleTheme = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }

  onMount(() => {
    if (!browser) return
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(stored ?? (prefersDark ? 'dark' : 'light'))
  })

  beforeNavigate(({ willUnload, to }) => {
    if ($updated && !willUnload && to?.url) {
      location.href = to.url.href
    }
  })
</script>

<button
  class="fixed top-4 right-4 z-20 flex items-center justify-center rounded-full p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 cursor-pointer"
  type="button"
  aria-label="Toggle theme"
  aria-pressed={theme === 'dark'}
  on:click={toggleTheme}>
  {#if theme === 'dark'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.41-1.41M6.34 6.34 4.93 4.93m12.14 0-1.41 1.41M6.34 17.66 4.93 19.07" />
    </svg>
  {/if}
</button>

<main class="my-0 mx-auto min-h-full max-w-screen-sm">
  <slot />
</main>
