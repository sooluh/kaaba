import { writable } from 'svelte/store'
import { browser } from '$app/environment'

function persisted<T>(key: string, fallback: T) {
  const stored = browser ? localStorage.getItem(key) : null
  const initial = stored ? (JSON.parse(stored) as T) : fallback
  const store = writable<T>(initial)

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  }

  return store
}

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
export const arabicFontSize = persisted('arabicFontSize', 30)
export const latinFontSize = persisted('latinFontSize', 16)
export const showTranslation = persisted('showTranslation', true)
export const showFawaid = persisted('showFawaid', true)
export const showFootnote = persisted('showFootnote', true)
export const itemsStore = writable<ItemStoreType | null>(null)
export const contentsStore = writable<ContentStoreType | null>(null)

let lockTimer: ReturnType<typeof setTimeout> | null = null
export const navigationLocked = writable(false)

export function lockNavigation(ms = 600) {
  navigationLocked.set(true)
  if (lockTimer) clearTimeout(lockTimer)
  lockTimer = setTimeout(() => navigationLocked.set(false), ms)
}
