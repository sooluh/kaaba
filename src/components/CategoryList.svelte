<script lang="ts">
  export let href: string
  export let icon: string
  export let title: string
  export let caption: string
</script>

<a
  {href}
  class="bg-white dark:bg-slate-800 rounded-xl w-full py-4 px-5 flex items-center gap-3 cursor-pointer border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition ease-linear duration-250 text-gray-900 dark:text-slate-100">
  <img class="h-[42px] rounded-lg" src={icon} alt={title} />

  <div class="flex-1">
    <h2 class="text-lg font-semibold">{title}</h2>
    <small class="text-sm text-gray-600 dark:text-gray-300">{caption}</small>
  </div>
</a>
