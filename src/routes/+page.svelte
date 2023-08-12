<script lang="ts">
  import noIcon from '$assets/icon.png'

  export let data

  console.log(data.categories)
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<header class="text-center py-10">
  <h1 class="text-2xl font-bold">{data.title}</h1>
</header>

<section id="categories" class="flex flex-col gap-4 px-5">
  {#if !data.categories}
    <!-- TODO: shimmer -->
    <div
      class="bg-white rounded-xl w-full py-4 px-5 flex items-center gap-3 cursor-pointer border-2 border-transparent hover:border-primary-500 transition ease-linear duration-250">
      <img class="h-[42px]" src={noIcon} alt="Loading" />
      <div class="flex-1">
        <h2 class="text-lg font-semibold">Loading</h2>
        <small class="text-sm text-gray-600">Loading</small>
      </div>
    </div>
  {:else}
    {#each data.categories as category}
      <a
        href="/{category.slug}"
        class="bg-white rounded-xl w-full py-4 px-5 flex items-center gap-3 cursor-pointer border-2 border-transparent hover:border-primary-500 transition ease-linear duration-250">
        <img class="h-[42px]" src={noIcon} alt={category.name} />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">{category.name}</h2>
          <small class="text-sm text-gray-600">{category.total} Bacaan</small>
        </div>
      </a>
    {/each}
  {/if}
</section>

<style lang="scss">
  #categories > a {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
</style>
