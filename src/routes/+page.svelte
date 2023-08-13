<script lang="ts">
  import { onMount } from 'svelte'
  import { fetcher } from '$lib/api'
  import noIcon from '$assets/no-icon.png'
  import Header from '$components/Header.svelte'
  import Preamble from '$components/Preamble.svelte'
  import CategoryList from '$components/CategoryList.svelte'
  import { categoriesStore, type CategoryType } from '$lib/stores'
  import CategorySkeleton from '$components/CategorySkeleton.svelte'

  let title = 'Doa & Dzikir'
  let categories: CategoryType[] | null = $categoriesStore || null

  const fetchData = async () => {
    if (!$categoriesStore) {
      categories = await fetcher('categories').then((res) => res.data)
      $categoriesStore = categories as CategoryType[]
    }
  }

  onMount(() => {
    fetchData()
  })
</script>

<Header {title} />

<section class="pb-6 px-5">
  <Preamble />
</section>

<section id="categories" class="flex flex-col gap-4 px-5 h-full overflow-y-auto pb-6">
  {#if !categories}
    {#each Array(5) as _}
      <CategorySkeleton />
    {/each}
  {:else}
    {#each categories as category}
      <CategoryList
        href="/{category.slug}"
        icon={noIcon}
        title={category.name}
        caption={`${category.total} Bacaan`} />
    {/each}
  {/if}
</section>

<style lang="scss">
  #categories {
    max-height: calc(100vh - 224px);
  }
</style>
