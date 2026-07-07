<script lang="ts">
  import {
    arabicFontSize,
    latinFontSize,
    showTranslation,
    showFawaid,
    showFootnote,
  } from '$lib/stores'

  export let theme: 'light' | 'dark'
  export let onToggleTheme: () => void
  export let onClose: () => void

  $: arSize = $arabicFontSize
  $: laSize = $latinFontSize
  $: st = $showTranslation
  $: sf = $showFawaid
  $: sfn = $showFootnote

  let showThemeDropdown = false

  const selectTheme = (value: 'light' | 'dark') => {
    if (theme !== value) onToggleTheme()
    showThemeDropdown = false
  }

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
    class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-[24rem] max-w-[90vw] p-6 shadow-xl flex flex-col gap-5"
    role="none"
    on:click|stopPropagation>
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

    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</span>
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer"
          on:click={() => (showThemeDropdown = !showThemeDropdown)}>
          {theme === 'light' ? 'Terang' : 'Gelap'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform {showThemeDropdown ? 'rotate-180' : ''}">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {#if showThemeDropdown}
          <div
            class="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-10 min-w-[8rem]">
            <button
              type="button"
              class="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer {theme ===
              'light'
                ? 'text-primary-500 font-medium'
                : 'text-gray-700 dark:text-gray-300'}"
              on:click={() => selectTheme('light')}>
              Terang
            </button>
            <button
              type="button"
              class="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer {theme ===
              'dark'
                ? 'text-primary-500 font-medium'
                : 'text-gray-700 dark:text-gray-300'}"
              on:click={() => selectTheme('dark')}>
              Gelap
            </button>
          </div>
        {/if}
      </div>
    </div>

    <hr class="border-slate-200 dark:border-slate-700" />

    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Font Arab</span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={arSize <= 18}
            on:click={() => adjustArabic(-2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M5 12h14" />
            </svg>
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400 tabular-nums w-8 text-center"
            >{arSize}</span>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={arSize >= 60}
            on:click={() => adjustArabic(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Font Latin</span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={laSize <= 12}
            on:click={() => adjustLatin(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M5 12h14" />
            </svg>
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400 tabular-nums w-8 text-center"
            >{laSize}</span>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={laSize >= 36}
            on:click={() => adjustLatin(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200 dark:border-slate-700 pt-3 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Terjemahan</span>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition cursor-pointer border-0 {st
            ? 'bg-primary-500'
            : 'bg-slate-300 dark:bg-slate-600'}"
          on:click={() => showTranslation.set(!st)}
          aria-label="Toggle terjemahan">
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform {st
              ? 'translate-x-5'
              : ''}" />
        </button>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Faedah</span>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition cursor-pointer border-0 {sf
            ? 'bg-primary-500'
            : 'bg-slate-300 dark:bg-slate-600'}"
          on:click={() => showFawaid.set(!sf)}
          aria-label="Toggle faedah">
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform {sf
              ? 'translate-x-5'
              : ''}" />
        </button>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Catatan Kaki</span>
        <button
          type="button"
          class="relative w-11 h-6 rounded-full transition cursor-pointer border-0 {sfn
            ? 'bg-primary-500'
            : 'bg-slate-300 dark:bg-slate-600'}"
          on:click={() => showFootnote.set(!sfn)}
          aria-label="Toggle catatan kaki">
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform {sfn
              ? 'translate-x-5'
              : ''}" />
        </button>
      </div>
    </div>

    <hr class="border-slate-200 dark:border-slate-700" />

    <p class="text-xs text-center text-gray-400 dark:text-gray-500">
      Menggunakan RESTful API dari
      <br />
      <a
        href="https://github.com/fitrahive/dua-dhikr"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary-500 hover:underline">
        github.com/fitrahive/dua-dhikr
      </a>
    </p>
  </div>
</button>
