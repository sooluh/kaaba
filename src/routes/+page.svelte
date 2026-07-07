<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { fetcher } from '$lib/api'
  import { icons } from '$lib/icons'
  import Header from '$components/Header.svelte'
  import Preamble from '$components/Preamble.svelte'
  import CategoryList from '$components/CategoryList.svelte'
  import { categoriesStore, navigationLocked, lockNavigation, type CategoryType } from '$lib/stores'
  import CategorySkeleton from '$components/CategorySkeleton.svelte'

  let title = 'Doa & Dzikir'
  let categories: CategoryType[] | null = $categoriesStore || null

  const fetchData = async () => {
    if (!$categoriesStore) {
      const res = (await fetcher('categories')) as { data: CategoryType[] }
      categories = res.data
      $categoriesStore = categories as CategoryType[]
    }
  }

  onMount(() => {
    fetchData()
  })
</script>

<div class="max-w-screen-sm mx-auto">
  <Header {title} />

  <section class="pb-6 px-5">
    <Preamble />
  </section>

  <section
    id="categories"
    class="flex flex-col gap-4 px-5 h-full overflow-y-auto pb-6 transition-opacity duration-200"
    class:opacity-60={$navigationLocked}
    style="pointer-events: {$navigationLocked ? 'none' : 'auto'}">
    {#if !categories}
      {#each Array(5) as _}
        <CategorySkeleton />
      {/each}
    {:else}
      {#each categories as category, i (category.slug)}
        <div
          role="none"
          in:fly={{ y: 16, duration: 300, delay: i * 40 }}
          on:click|capture={() => lockNavigation()}>
          <CategoryList
            href="/{category.slug}"
            icon={icons(category.slug)}
            title={category.name}
            caption={`${category.total} Bacaan`} />
        </div>
      {/each}
    {/if}
  </section>
</div>

<style lang="scss">
  #categories {
    max-height: calc(100vh - 224px);
  }
</style>
