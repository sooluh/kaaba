<script lang="ts">
  export let title: string
  export let subtitle = ''
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="text-center py-5 text-gray-900 dark:text-slate-100">
  <div class="grid grid-cols-[1.5rem_1fr_1.5rem] items-center gap-2 px-4">
    <div>
      <slot name="left" />
    </div>

    <div class="flex flex-col items-center justify-center min-h-13 min-w-0">
      <h1 class="text-2xl font-bold truncate w-full">{title}</h1>
      <small
        class="text-xs text-gray-500 dark:text-gray-400 leading-tight truncate w-full {subtitle
          ? ''
          : 'invisible'}">
        {subtitle || '\u00A0'}
      </small>
    </div>

    <div class="justify-self-end">
      <slot name="right" />
    </div>
  </div>
</header>
