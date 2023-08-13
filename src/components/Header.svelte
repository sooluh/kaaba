<script lang="ts">
  export let title: string
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="text-center py-5">
  <div class="flex px-4 items-center justify-between">
    <div class="w-6 shrink-0">
      <slot name="left" />
    </div>
    <h1 class="text-2xl font-bold">{title}</h1>
    <div class="w-6 shrink-0">
      <slot name="right" />
    </div>
  </div>
</header>
