import { writable } from 'svelte/store'

export type CategoryType = {
  name: string
  slug: string
  total: number
}

export type ItemType = {
  id: number
  title: string
  category: string
  categoryName: string
}

export type ContentType = {
  id: number
  title: string
  category: string
  categoryName: string
  arabic: string
  latin: string
  translation: string
  notes: string | null
  fawaid: string
  source: string
}

type ItemStoreType = Record<string, ItemType[]>
type ContentStoreType = Record<string, Record<string, ContentType>>

export const categoriesStore = writable<CategoryType[] | null>(null)
export const itemsStore = writable<ItemStoreType | null>(null)
export const contentsStore = writable<ContentStoreType | null>(null)
