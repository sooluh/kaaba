import { fetcher } from '$lib/api'
import type { Load } from '@sveltejs/kit'

type CategoryType = {
  name: string
  slug: string
  total: number
}

export const load: Load = async () => {
  const categories: CategoryType[] = await fetcher('categories').then((res) => res.data)

  return { title: 'Doa & Dzikir', categories }
}
