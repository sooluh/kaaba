<script lang="ts">
  export let keyword: string
  export let onSearch: () => void
</script>

<div class="relative">
  <input
    bind:value={keyword}
    on:input={onSearch}
    class="w-full border px-4 py-3 rounded-lg"
    placeholder="Cari doa ..."
    type="text"
    name="search"
    id="search" />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={onSearch}
    class="absolute top-0 right-0 h-[50px] flex items-center px-4 text-gray-500 cursor-pointer">
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
