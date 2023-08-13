<script lang="ts">
  export let href: string
  export let id: number | string
  export let title: string
</script>

<a
  {href}
  class="bg-white rounded-xl w-full py-4 px-5 flex items-center gap-3 cursor-pointer border-2 border-transparent hover:border-primary-500 transition ease-linear duration-250">
  <div
    class="bg-primary-500 w-8 h-8 flex items-center justify-center text-white rounded-full shrink-0">
    {id}
  </div>
  <h2 class="font-medium">{title}</h2>
</a>
