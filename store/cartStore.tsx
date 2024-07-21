import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

        removeAllFromCart:()=>set({items:[]}),

      total: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      removeAll: () => set({ items: [] }),

      increment: (id: number) =>
        get()
          .items.filter((item) => item.id === id)
          .map((item) =>
            set((state) => ({
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            }))
          ),
      decrement: (id: number) =>
        get()
          .items.filter((item) => item.id === id)
          .map((item) =>
            set((state) => ({
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity===1?item.quantity=1 :item.quantity - 1 } : item
              ),
            }))
          ),
    }),

    { name: 'cartStore', storage: createJSONStorage(() => localStorage) }
  )
)
