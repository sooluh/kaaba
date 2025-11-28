<script lang="ts">
  import { fetcher } from '$lib/api'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import Header from '$components/Header.svelte'
  import { goto } from '$app/navigation'
  import { contentsStore, itemsStore, type ContentType, type ItemType } from '$lib/stores'

  let title = 'Doa & Dzikir'
  let isClicked = false
  let category: string
  let id: string
  let items: ItemType[] | null = null
  let content: ContentType | null = null
  let lastLoadedId: string | null = null

  $: category = $page.params.slug
  $: id = $page.params.id
  $: if ($itemsStore?.[category]) items = $itemsStore[category]
  $: content = $contentsStore?.[category]?.[Number(id)] || null
  $: currentIndex = items?.findIndex((item) => item.id === Number(id)) ?? -1
  $: prev = items && currentIndex > 0 ? items[currentIndex - 1].id : null
  $: next =
    items && currentIndex >= 0 && currentIndex < items.length - 1
      ? items[currentIndex + 1].id
      : null

  const navClass = (enabled: boolean) =>
    `w-1/2 flex justify-center ${
      enabled
        ? 'text-primary-500 dark:text-primary-300 cursor-pointer'
        : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'
    }`

  const handleClick = (href: string) => {
    if (!isClicked) {
      isClicked = true

      setTimeout(() => {
        isClicked = false
      }, 500)

      goto(href)
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
      return
    }

    const fetched = await fetcher('categories', category, param).then((res) => res.data)

    if (!fetched) return goto(`/${category}`)

    content = fetched as ContentType
    title = content.categoryName
    $contentsStore = {
      ...$contentsStore,
      [category]: { ...($contentsStore?.[category] ?? {}), [param]: content },
    }
  }

  $: if (category && id) {
    if (browser && lastLoadedId !== id) {
      lastLoadedId = id
      loadContent(id)
    }
  }
</script>

<Header {title}>
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

<section id="content" class="flex flex-col gap-8 px-5 h-full overflow-y-auto pb-[110px]">
  {#if content}
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

<div class="fixed bottom-0 left-0 right-0 w-full py-5 px-10 max-w-screen-sm mx-auto">
  <div
    class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 drop-shadow-sm shadow-center rounded-full flex p-3 font-semibold">
    <button
      on:click={() => prev && handleClick(`/${category}/${prev}`)}
      disabled={!prev || isClicked}
      class={navClass(Boolean(prev && !isClicked)) +
        ' border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary-200 rounded-full'}>
      Sebelumnya
    </button>

    <button
      on:click={() => next && handleClick(`/${category}/${next}`)}
      disabled={!next || isClicked}
      class={navClass(Boolean(next && !isClicked)) +
        ' border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary-200 rounded-full'}>
      Berikutnya
    </button>
  </div>
</div>

<style lang="scss">
  #content {
    max-height: calc(100vh - 72px);
  }

  [dir='rtl'] {
    font-family: 'Amiri Quran', serif;
  }
</style>
