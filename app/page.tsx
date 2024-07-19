'use client'

import ListDesserts from '@/components/ListDesserts'
import { useCartStore } from '@/store/cartStore'
export default function Home() {
  const { addItemToCart, items, removeItemFromCart, total, increment, decrement } =
    useCartStore()

  return (
    <main className='w full flex flex-col justify-center items-center bg-[var(--Rose-100)] min-h-screen p-12     '>
      <div className='w-full grid grid-cols-[3fr_1fr] gap-4   '>
        <div>
          <h1 className='text-3xl font-bold mb-6'>Desserts</h1>
          <ListDesserts />
        </div>
        {items.length > 0 ? (
          <div className='w-[350px] h-[300px] justify-self-end shadow-[3px_3px_2px_1px_var(--Rose-300)] p-4 rounded-[12px]'>
            <h2 className='text-2xl font-bold text-[var(--Rose-500)] '>
              Your Cart <span>({items.length})</span>
            </h2>
            <div className='max-h-[200px] overflow-y-auto'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-center  border-b-2 border-gray-300 '
                >
                  <div className='flex flex-col'>
                    <div>{item.name}</div>
                    <div className='flex items-center gap-4'>
                      <div>${item.price.toFixed(2)}</div>

                      <div className='flex items-center'>
                        <button onClick={() => decrement(item.id)}>➖</button>
                        <div className='flex items-center justify-center  w-[30px] h-[30px] rounded-full border-2 border-gray-500'>{item.quantity}</div>
                        <button onClick={() => increment(item.id)}>➕</button>
                      </div>
                      <div>= ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeItemFromCart(item.id)}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <p className='font-bold text-2xl'>Total: ${total().toFixed(2)}</p>
          </div>
        ) : (
          <div className='bg-img justify-self-end'>
            <button className='h-full flex flex-col justify-between  p-4'>
              <h2 className='text-2xl font-bold text-[var(--Rose-500)] '>
                Your Cart <span>({items.length})</span>
              </h2>
              <p>Your added items will appear here</p>
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
