<script lang="ts">
  import { arabicFontSize, latinFontSize } from '$lib/stores'

  export let theme: 'light' | 'dark'
  export let onToggleTheme: () => void
  export let onClose: () => void

  $: arSize = $arabicFontSize
  $: laSize = $latinFontSize

  const adjustArabic = (delta: number) => {
    const next = Math.max(18, Math.min(60, arSize + delta))
    if (next !== arSize) arabicFontSize.set(next)
  }

  const adjustLatin = (delta: number) => {
    const next = Math.max(12, Math.min(36, laSize + delta))
    if (next !== laSize) latinFontSize.set(next)
  }
</script>

<button
  type="button"
  class="fixed inset-0 z-50 w-full flex items-center justify-center bg-black/40 border-0 cursor-default"
  on:click|self={onClose}
  aria-label="Close settings">
  <div
    class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-[22rem] max-w-[90vw] p-6 shadow-xl flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-slate-100">Pengaturan</h2>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition cursor-pointer"
        aria-label="Close settings"
        on:click={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</span>
      <div class="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          type="button"
          class="flex-1 py-2 text-sm font-medium transition cursor-pointer {theme === 'light'
            ? 'bg-primary-500 text-white'
            : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'}"
          on:click={() => theme !== 'light' && onToggleTheme()}>
          Terang
        </button>
        <button
          type="button"
          class="flex-1 py-2 text-sm font-medium transition cursor-pointer {theme === 'dark'
            ? 'bg-primary-500 text-white'
            : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'}"
          on:click={() => theme !== 'dark' && onToggleTheme()}>
          Gelap
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Ukuran Font Arab</span>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={arSize <= 18}
          on:click={() => adjustArabic(-2)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M5 12h14" />
          </svg>
        </button>
        <div class="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary-500 rounded-full transition-all"
            style="width: {((arSize - 18) / 42) * 100}%" />
        </div>
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={arSize >= 60}
          on:click={() => adjustArabic(2)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M12 5v14" /><path d="M5 12h14" />
          </svg>
        </button>
        <span class="w-8 text-right text-sm text-gray-500 dark:text-gray-400 tabular-nums"
          >{arSize}px</span>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Ukuran Font Latin</span>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={laSize <= 12}
          on:click={() => adjustLatin(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M5 12h14" />
          </svg>
        </button>
        <div class="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary-500 rounded-full transition-all"
            style="width: {((laSize - 12) / 24) * 100}%" />
        </div>
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={laSize >= 36}
          on:click={() => adjustLatin(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M12 5v14" /><path d="M5 12h14" />
          </svg>
        </button>
        <span class="w-8 text-right text-sm text-gray-500 dark:text-gray-400 tabular-nums"
          >{laSize}px</span>
      </div>
    </div>
  </div>
</button>
