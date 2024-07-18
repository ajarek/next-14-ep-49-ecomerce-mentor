import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
export type Cart = {
  id: number
  name: string
  price: number
  image: {
    thumbnail: string
  }
  category: string
}

type ItemState = {
  items: Cart[]
  addItemToCart: (item: Cart) => void
  removeItemFromCart: (id: number) => void
  total: () => number
  removeAll: () => void
}

export const useCartStore = create<ItemState>()(
  persist(
    (set, get) => ({
      items: [],

      addItemToCart: (item: Cart) =>
        set((state) => ({
          items: [item, ...state.items],
        })),

      removeItemFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      total: () => get().items.reduce((acc, item) => acc + item.price, 0),
      removeAll: () => set({ items: [] }),
    }),
    { name: 'cartStore', storage: createJSONStorage(() => localStorage) }
  )
)
