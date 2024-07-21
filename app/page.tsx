'use client'

import ListDesserts from '@/components/ListDesserts'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const {
    addItemToCart,
    items,
    removeItemFromCart,
    total,
    increment,
    decrement,
    removeAllFromCart,
  } = useCartStore()
  const [modal, setModal] = useState(false)

  return (
    <main className='w full flex flex-col justify-center items-center bg-[var(--Rose-100)] min-h-screen p-12 max-lg:px-4'>
      {modal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex justify-center items-center'>
          <div className='w-[350px] h-[450px] bg-[var(--Rose-100)] justify-self-end shadow-[2px_2px_1px_1px_var(--Rose-300)] p-4 rounded-[12px]'>
            <div className='text-xl'>☑️</div>
            <h1 className='text-2xl font-bold'>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
            <div className='max-h-[200px] overflow-y-auto scrollbar  p-2'>

           
            {items.length > 0 &&
              items.map((item) => (
                <div
                  key={item.id}
                  className='flex  items-center justify-start  border-b-2 border-gray-300 gap-2 mt-4 '
                >
                  <Image
                    src={item.image.thumbnail}
                    alt={item.name}
                    width={50}
                    height={50}
                  />

                  <div className='w-full flex flex-col'>
                    <div>{item.name}</div>
                    <div className='w-full flex justify-between items-center '>
                      <div className='flex items-center  gap-4'>
                        <div className='flex items-center justify-center  w-[30px] h-[30px] rounded-full '>
                          {item.quantity}x
                        </div>
                        <div>@${item.price.toFixed(2)}</div>
                      </div>
                      <div> ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
               </div>
              <div className='flex justify-between items-center mt-4'>
               <div>Order Total</div>
              <div className='font-bold text-2xl'>${total().toFixed(2)}</div>
              </div>
            <button
              onClick={() => {
                setModal(false)
                removeAllFromCart()
              }}
              className='w-full p-2 bg-[var(--Rose-50)] rounded-full  border-2 border-[var(--Rose-500)] hover:font-bold transition-all mt-4'
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
      <div className='w-full grid grid-cols-[3fr_1fr] gap-4 max-lg:grid-cols-subgrid  '>
        <div>
          <h1 className='text-3xl font-bold mb-6'>Desserts</h1>
          <ListDesserts />
        </div>
        {items.length > 0 ? (
          <div className='w-[350px] h-[400px] max-lg:justify-self-center justify-self-end shadow-[3px_3px_2px_1px_var(--Rose-300)] p-4 rounded-[12px]'>
            <h2 className='text-2xl font-bold text-[var(--Rose-500)] '>
              Your Cart <span>({items.length})</span>
            </h2>
            <div className='max-h-[200px] overflow-y-auto p-2 scrollbar'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-center  border-b-2 border-gray-300 '
                >
                  <div className='flex flex-col'>
                    <div>{item.name}</div>
                    <div className='flex items-center gap-4'>
                      <div>${item.price.toFixed(2)}</div>

                      <div className='flex items-center gap-1'>
                        <button onClick={() => decrement(item.id)}>➖</button>
                        <div className='flex items-center justify-center  w-[30px] h-[30px] rounded-full border-2 border-gray-500'>
                          {item.quantity}
                        </div>
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
            <div className='flex items-center justify-between mt-4'>
              <button
                className='text-[var(--Red)] border border-[var(--Red)] px-4 py-1 rounded-lg hover:bg-[var(--Red)] hover:text-[var(--Rose-50)]'
                onClick={() => removeAllFromCart()}
              >
                Delete All
              </button>
              <p className='font-bold text-2xl'>Total: ${total().toFixed(2)}</p>
            </div>
            <div className='w-full flex justify-center items-center   mt-6'>
              <button
                className='text-[var(--Green)] border border-[var(--Green)] px-4 py-1 rounded-lg hover:bg-[var(--Green)] hover:text-[var(--Rose-50)]'
                onClick={() => setModal(true)}
              >
                Confirm Order
              </button>
            </div>
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
