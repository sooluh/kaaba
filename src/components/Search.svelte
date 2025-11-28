<script lang="ts">
  export let keyword: string
  export let onSearch: () => void
</script>

<div class="relative">
  <input
    bind:value={keyword}
    on:input={onSearch}
    class="w-full border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-lg outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:border-primary-500/70 dark:focus:ring-primary-500/40"
    placeholder="Cari doa ..."
    type="text"
    name="search"
    id="search" />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    role="button"
    tabindex="0"
    on:click={onSearch}
    class="absolute top-0 right-0 h-[50px] flex items-center px-4 text-gray-500 dark:text-gray-300 cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-search">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </div>
</div>
