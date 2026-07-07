<script lang="ts">
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { find } from '$lib/find'
  import { fetcher } from '$lib/api'
  import { icons } from '$lib/icons'
  import { page, navigating } from '$app/stores'
  import { browser } from '$app/environment'
  import Header from '$components/Header.svelte'
  import { goto } from '$app/navigation'
  import CategoryList from '$components/CategoryList.svelte'
  import Preamble from '$components/Preamble.svelte'
  import Search from '$components/Search.svelte'
  import ItemList from '$components/ItemList.svelte'
  import {
    categoriesStore,
    contentsStore,
    itemsStore,
    navigationLocked,
    lockNavigation,
    type CategoryType,
    type ContentType,
    type ItemType,
  } from '$lib/stores'

  let title = 'Doa & Dzikir'
  let category: string
  let id: string
  let items: ItemType[] | null = null
  let categories: CategoryType[] | null = $categoriesStore || null
  let content: ContentType | null = null
  let lastLoadedId: string | null = null
  let showContentTitle = false
  let loadingContent = false
  let centerKeyword = ''

  $: headerTitle = showContentTitle && content ? content.title : title
  $: headerSubtitle = showContentTitle && content?.notes ? content.notes : ''
  $: filteredItems = centerKeyword ? find(items || [], centerKeyword) : items
  $: locked = $navigationLocked || $navigating !== null

  $: category = $page.params.slug
  $: id = $page.params.id
  $: if ($itemsStore?.[category]) items = $itemsStore[category]
  $: currentIndex = items?.findIndex((item) => item.id === Number(id)) ?? -1
  $: prev = items && currentIndex > 0 ? items[currentIndex - 1].id : null
  $: next =
    items && currentIndex >= 0 && currentIndex < items.length - 1
      ? items[currentIndex + 1].id
      : null
  $: catTitle = items?.[0]?.categoryName || 'Doa & Dzikir'
  $: navEnabled = (enabled: boolean) => enabled && !locked

  const panelOpacity = tweened(0, { duration: 250, easing: cubicOut })

  const handleClick = (href: string) => {
    if (!locked) {
      lockNavigation()
      goto(href)
    }
  }

  const fetchCategories = async () => {
    if (!$categoriesStore) {
      categories = await fetcher('categories').then((res) => res.data as CategoryType[])
      $categoriesStore = categories as CategoryType[]
    }
  }

  const ensureItems = async () => {
    if (items) return

    const cached = $itemsStore?.[category]

    if (cached) {
      items = cached
      return
    }

    const fetched = await fetcher('categories', category).then((res) => res.data)

    items = fetched as ItemType[]
    $itemsStore = { ...$itemsStore, [category]: items }
  }

  const loadContent = async (param: string) => {
    await ensureItems()

    const cached = $contentsStore?.[category]?.[param]

    if (cached) {
      content = cached
      title = cached.categoryName
      loadingContent = false
      return
    }

    const fetched = await fetcher('categories', category, param).then((res) => res.data)

    if (!fetched) {
      loadingContent = false
      return goto(`/${category}`)
    }

    content = fetched as ContentType
    title = content.categoryName
    loadingContent = false
    $contentsStore = {
      ...$contentsStore,
      [category]: { ...($contentsStore?.[category] ?? {}), [param]: content },
    }
  }

  $: if (category && id) {
    if (browser && lastLoadedId !== id) {
      lastLoadedId = id
      showContentTitle = false
      loadingContent = true
      content = $contentsStore?.[category]?.[Number(id)] || null
      loadContent(id)
    }
  }

  onMount(() => {
    fetchCategories()
    panelOpacity.set(1)
  })

  const handleContentScroll = (e: Event) => {
    showContentTitle = (e.target as HTMLElement).scrollTop > 40
  }
</script>

<div class="lg:flex lg:flex-row lg:justify-center lg:gap-0 lg:h-screen">
  <div
    class="hidden lg:flex lg:flex-col lg:flex-1 lg:max-w-screen-sm lg:min-w-0 lg:overflow-y-auto lg:border-r lg:border-slate-200 lg:dark:border-slate-700"
    style="opacity: {$panelOpacity}">
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

  <nav
    class="hidden lg:flex lg:flex-col lg:flex-1 lg:max-w-screen-sm lg:min-w-0 lg:overflow-y-auto lg:border-r lg:border-slate-200 lg:dark:border-slate-700"
    style="opacity: {$panelOpacity}">
    <div class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
      <Header title={catTitle}>
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
    <div class="px-5 flex flex-col gap-4 pb-6">
      <div class="pt-4">
        <Search bind:keyword={centerKeyword} onSearch={() => undefined} />
      </div>
      <div
        class="flex flex-col gap-4 transition-opacity duration-200"
        class:opacity-60={locked}
        style="pointer-events: {locked ? 'none' : 'auto'}">
        {#if filteredItems}
          {#each filteredItems as item}
            <div role="none" on:click|capture={() => lockNavigation()}>
              <ItemList
                href="/{category}/{item.id}"
                id={item.id}
                title={item.title}
                active={item.id === Number(id)} />
            </div>
          {/each}
        {:else}
          {#each Array(5) as _}
            <div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl h-13.5" />
          {/each}
        {/if}
      </div>
    </div>
  </nav>

  <div class="lg:flex-1 lg:max-w-screen-sm lg:min-w-0 lg:flex lg:flex-col">
    <div class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
      <Header title={headerTitle} subtitle={headerSubtitle}>
        <a slot="left" class="w-6" href="/{category}" title="Back to {title}">
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

    <section
      id="content"
      on:scroll={handleContentScroll}
      class="flex flex-col gap-8 px-5 h-full overflow-y-auto pb-27.5 lg:flex-1 lg:pb-0 lg:max-h-none">
      {#if loadingContent}
        <div class="flex flex-col gap-8">
          <div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded h-7 w-48" />
          <div dir="rtl" class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded h-32 w-full" />
          <div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded h-5 w-64" />
          <div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded h-24 w-full" />
        </div>
      {:else if content}
        <div>
          <h2 class="text-xl font-medium">{content.title}</h2>

          {#if content.notes}
            <small class="text-gray-400 dark:text-gray-500 font-medium">{content.notes}</small>
          {/if}
        </div>

        <div dir="rtl" class="text-3xl leading-16">{content.arabic}</div>
        <p class="italic text-gray-600 dark:text-gray-400">{content.latin.toLowerCase()}</p>

        <div>
          <h3 class="text-lg font-medium mb-3">Terjemahan</h3>
          <p class="text-gray-700 dark:text-gray-400">{content.translation}</p>
        </div>

        {#if content.fawaid}
          <div>
            <h3 class="text-lg font-medium mb-3">Faedah</h3>
            <p class="text-gray-700 dark:text-gray-400">{content.fawaid}</p>
          </div>
        {/if}

        {#if content.source}
          <p class="text-center text-gray-400 dark:text-gray-500">{content.source}</p>
        {/if}
      {/if}
    </section>

    <div class="fixed bottom-0 left-0 right-0 lg:static w-full py-5 px-10">
      <div
        class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 drop-shadow-sm shadow-center rounded-full flex p-3 font-semibold">
        <button
          on:click={() => prev && handleClick(`/${category}/${prev}`)}
          disabled={!prev || locked}
          class="w-1/2 flex justify-center border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary-200 rounded-full {navEnabled(
            Boolean(prev)
          )
            ? 'text-primary-500 dark:text-primary-300 cursor-pointer'
            : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'}">
          Sebelumnya
        </button>

        <button
          on:click={() => next && handleClick(`/${category}/${next}`)}
          disabled={!next || locked}
          class="w-1/2 flex justify-center border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary-200 rounded-full {navEnabled(
            Boolean(next)
          )
            ? 'text-primary-500 dark:text-primary-300 cursor-pointer'
            : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'}">
          Berikutnya
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #content {
    max-height: calc(100vh - 72px);
  }

  [dir='rtl'] {
    font-family: 'Amiri Quran', serif;
  }

  @media (min-width: 1024px) {
    #content {
      max-height: none;
    }
  }
</style>
