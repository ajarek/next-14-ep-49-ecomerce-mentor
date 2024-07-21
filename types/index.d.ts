declare type Cart = {
  id: number
  name: string
  price: number
  image: {
    thumbnail: string
  }
  category: string
  quantity: number
}

declare type ItemState = {
  items: Cart[]
  addItemToCart: (item: Cart) => void
  removeItemFromCart: (id: number) => void
  total: () => number
  removeAll: () => void
  increment: (id: number) => void
  decrement: (id: number) => void
  removeAllFromCart: () => void
}