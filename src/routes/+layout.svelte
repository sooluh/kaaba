<script lang="ts">
  import '../app.scss'

  import { updated } from '$app/stores'
  import { beforeNavigate } from '$app/navigation'

  beforeNavigate(({ willUnload, to }) => {
    if ($updated && !willUnload && to?.url) {
      location.href = to.url.href
    }
  })
</script>

<main class="my-0 mx-auto min-h-full max-w-screen-sm">
  <slot />
</main>
