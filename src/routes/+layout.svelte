<script lang="ts">
  import '../app.css'

  import { beforeNavigate } from '$app/navigation'
  import { browser } from '$app/environment'
  import { updated } from '$app/stores'
  import { onMount } from 'svelte'
  import SettingsModal from '$components/SettingsModal.svelte'
  import { arabicFontSize, latinFontSize } from '$lib/stores'

  let theme: 'light' | 'dark' = 'light'
  let showSettings = false

  $: arSize = $arabicFontSize
  $: laSize = $latinFontSize

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
  aria-label="Settings"
  on:click={() => (showSettings = true)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path
      d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
</button>

{#if showSettings}
  <SettingsModal {theme} onToggleTheme={toggleTheme} onClose={() => (showSettings = false)} />
{/if}

<main
  class="my-0 mx-auto min-h-full max-w-screen-sm lg:max-w-none"
  style="--arabic-font-size: {arSize}px; --latin-font-size: {laSize}px">
  <slot />
</main>
