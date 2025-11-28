<script lang="ts">
  export let href: string
  export let id: number | string
  export let title: string
</script>

<a
  {href}
  class="bg-white dark:bg-slate-800 rounded-xl w-full py-4 px-5 flex items-center gap-3 cursor-pointer border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition ease-linear duration-250 text-gray-900 dark:text-slate-100">
  <div
    class="bg-primary-500 w-8 h-8 flex items-center justify-center text-white rounded-full shrink-0">
    {id}
  </div>
  <h2 class="font-medium">{title}</h2>
</a>
