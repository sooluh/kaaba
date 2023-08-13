<script lang="ts">
  import { onMount } from 'svelte'
  import { find } from '$lib/find'
  import { fetcher } from '$lib/api'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import Header from '$components/Header.svelte'
  import Search from '$components/Search.svelte'
  import ItemList from '$components/ItemList.svelte'
  import { itemsStore, type ItemType } from '$lib/stores'
  import ItemSkeleton from '$components/ItemSkeleton.svelte'

  let title = 'Doa & Dzikir'
  let keyword: string = ''
  let category: string = $page.params.slug
  let items: ItemType[] | null = $itemsStore?.[category] || null

  const search = () => {
    if ($itemsStore?.[category]) {
      items = find($itemsStore?.[category], keyword)
    }
  }

  const fetchData = async () => {
    if (!$itemsStore || !(category in $itemsStore)) {
      items = await fetcher('categories', category).then((res) => res.data)
      if (!$itemsStore) $itemsStore = {}
      $itemsStore[category] = items as ItemType[]
    }

    if ((items?.length || 0) <= 0) {
      return goto('/')
    }

    title = items![0].categoryName!
  }

  onMount(() => {
    fetchData()
  })
</script>

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

<section class="flex flex-col gap-4 px-5 pb-6">
  <Search bind:keyword onSearch={search} />
</section>

<section id="items" class="flex flex-col gap-4 px-5 h-full overflow-y-auto pb-6">
  {#if !items}
    {#each Array(5) as _}
      <ItemSkeleton />
    {/each}
  {:else}
    {#each items as item}
      <ItemList href="/{category}/{item.id}" id={item.id} title={item.title} />
    {/each}
  {/if}
</section>

<style lang="scss">
  #items {
    max-height: calc(100vh - 146px);
  }
</style>
