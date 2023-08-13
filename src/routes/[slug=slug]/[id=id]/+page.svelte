<script lang="ts">
  import { onMount } from 'svelte'
  import { fetcher } from '$lib/api'
  import { page } from '$app/stores'
  import Header from '$components/Header.svelte'
  import { beforeNavigate, goto } from '$app/navigation'
  import { contentsStore, type ContentType } from '$lib/stores'

  let title = 'Doa & Dzikir'
  let isClicked = false

  $: category = $page.params.slug
  $: id = $page.params.id
  $: next = Number(id) + 1
  $: prev = Number(id) - 1
  $: content = $contentsStore?.[category]?.[Number(id)] || null

  const handleClick = (href: string) => {
    if (!isClicked) {
      isClicked = true

      setTimeout(() => {
        isClicked = false
      }, 1_000)

      goto(href)
    }
  }

  const fetchData = async (param: string | null = null) => {
    param = param || id

    if (!$contentsStore || !(category in $contentsStore) || !(param in $contentsStore[category]!)) {
      content = await fetcher('categories', category, param).then((res) => res.data)

      if (!content) return goto(`/${category}`)
      if (!$contentsStore) $contentsStore = {}

      if (category in $contentsStore) {
        $contentsStore[category][param] = content as ContentType
      } else {
        $contentsStore[category] = { [param]: content as ContentType }
      }
    }

    if (!content) {
      return goto(`/${category}`)
    }

    title = content.categoryName
  }

  onMount(() => {
    fetchData()
  })

  beforeNavigate((evt) => {
    fetchData(evt.to?.params?.id!)
  })
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
        <small class="text-gray-400 font-medium">{content.notes}</small>
      {/if}
    </div>

    <div dir="rtl" class="text-2xl leading-[3rem]">{content.arabic}</div>
    <p class="italic text-gray-600">{content.latin.toLowerCase()}</p>

    <div>
      <h3 class="text-lg font-medium mb-3">Terjemahan</h3>
      <p class="text-gray-700">{content.translation}</p>
    </div>

    {#if content.fawaid}
      <div>
        <h3 class="text-lg font-medium mb-3">Faedah</h3>
        <p class="text-gray-700">{content.fawaid}</p>
      </div>
    {/if}

    {#if content.source}
      <p class="text-center text-gray-400">{content.source}</p>
    {/if}
  {/if}
</section>

<div class="fixed bottom-0 left-0 right-0 w-full py-5 px-10 max-w-screen-sm mx-auto">
  <div class="bg-white drop-shadow-lg border rounded-full flex p-3 font-semibold">
    {#if id === '1'}
      <button class="w-1/2 flex justify-center text-gray-500 cursor-pointer" disabled={true}>
        Sebelumnya
      </button>
    {:else}
      <button
        on:click={() => handleClick(`/${category}/${prev}`)}
        disabled={isClicked}
        class="w-1/2 flex justify-center text-primary-500 cursor-pointer">
        Sebelumnya
      </button>
    {/if}

    <button
      on:click={() => handleClick(`/${category}/${next}`)}
      disabled={isClicked}
      class="w-1/2 flex justify-center text-primary-500 cursor-pointer">
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
