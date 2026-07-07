<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { find } from '$lib/find'
  import { fetcher } from '$lib/api'
  import { icons } from '$lib/icons'
  import { page, navigating } from '$app/stores'
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'
  import Header from '$components/Header.svelte'
  import Search from '$components/Search.svelte'
  import ItemList from '$components/ItemList.svelte'
  import CategoryList from '$components/CategoryList.svelte'
  import Preamble from '$components/Preamble.svelte'
  import {
    categoriesStore,
    itemsStore,
    navigationLocked,
    lockNavigation,
    type CategoryType,
    type ItemType,
  } from '$lib/stores'
  import ItemSkeleton from '$components/ItemSkeleton.svelte'

  let title = 'Doa & Dzikir'
  let keyword = ''
  let items: ItemType[] | null = null
  let categories: CategoryType[] | null = $categoriesStore || null

  $: category = $page.params.slug
  $: locked = $navigationLocked || $navigating !== null

  const leftPanelOpacity = tweened(0, { duration: 250, easing: cubicOut })

  const search = () => {
    if ($itemsStore?.[category]) {
      items = find($itemsStore?.[category], keyword)
    }
  }

  $: if (browser && category) {
    keyword = ''
    items = $itemsStore?.[category] || null
    title = items?.[0]?.categoryName || 'Doa & Dzikir'
    fetchData()
  }

  const fetchCategories = async () => {
    if (!$categoriesStore) {
      const response = (await fetcher('categories')) as { data: CategoryType[] }
      categories = response.data
      $categoriesStore = response.data
    }
  }

  const fetchData = async () => {
    if (!$itemsStore || !(category in $itemsStore)) {
      const response = (await fetcher('categories', category)) as { data: ItemType[] }
      items = response.data
      if (!$itemsStore) $itemsStore = {}
      $itemsStore[category] = items as ItemType[]
    }

    if ((items?.length || 0) <= 0) {
      return goto('/')
    }

    title = items?.[0]?.categoryName || 'Doa & Dzikir'
  }

  onMount(() => {
    fetchCategories()
    leftPanelOpacity.set(1)
  })
</script>

<div class="lg:flex lg:flex-row lg:justify-center lg:gap-0 lg:h-screen">
  <div
    class="hidden lg:flex lg:flex-col lg:flex-1 lg:max-w-screen-sm lg:min-w-0 lg:overflow-y-auto lg:border-r lg:border-slate-200 lg:dark:border-slate-700"
    style="opacity: {$leftPanelOpacity}">
    <div class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
      <Header title="Doa & Dzikir" />
    </div>
    <section class="pb-4 px-5">
      <Preamble />
    </section>
    <div
      class="px-5 flex flex-col gap-4 pb-6 transition-opacity duration-200"
      class:opacity-60={locked}
      style="pointer-events: {locked ? 'none' : 'auto'}">
      {#if categories}
        {#each categories as cat}
          <div role="none" on:click|capture={() => lockNavigation()}>
            <CategoryList
              href="/{cat.slug}"
              icon={icons(cat.slug)}
              title={cat.name}
              caption={`${cat.total} Bacaan`}
              active={cat.slug === category} />
          </div>
        {/each}
      {:else}
        {#each Array(5) as _}
          <div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl h-18.5" />
        {/each}
      {/if}
    </div>
  </div>

  <div class="lg:flex-1 lg:max-w-screen-sm lg:min-w-0 lg:overflow-y-auto">
    <div class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
      <Header {title}>
        <a slot="left" class="w-6" href="/" title="Back to Home">
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
            class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </a>
      </Header>
    </div>

    <section class="flex flex-col gap-4 px-5 pb-6">
      <Search bind:keyword onSearch={search} />
    </section>

    <section
      id="items"
      class="flex flex-col gap-4 px-5 pb-6 transition-opacity duration-200"
      class:opacity-60={locked}
      style="pointer-events: {locked ? 'none' : 'auto'}">
      {#if !items}
        {#each Array(5) as _}
          <ItemSkeleton />
        {/each}
      {:else}
        {#each items as item, i (item.id)}
          <div
            role="none"
            in:fly={{ y: 12, duration: 250, delay: i * 30 }}
            on:click|capture={() => lockNavigation()}>
            <ItemList href="/{category}/{item.id}" id={item.id} title={item.title} />
          </div>
        {/each}
      {/if}
    </section>
  </div>
</div>

<style lang="scss">
  #items {
    max-height: calc(100vh - 146px);
    overflow-y: auto;
  }

  @media (min-width: 1024px) {
    #items {
      max-height: none;
      overflow-y: visible;
    }
  }
</style>
