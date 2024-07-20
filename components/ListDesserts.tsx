'use client'
import data from '@/data/data.json'
import Image from 'next/image'
import {useCartStore} from '@/store/cartStore'
import type {Cart} from '@/store/cartStore'
import { useState } from 'react'

const ListDesserts = () => {
  const {addItemToCart,  items}= useCartStore()
  
  const handleCart =(item:Cart)=>{
    
    if(items.some((i)=>i.id===item.id)) return
    const newItem = {...item, quantity: item.quantity}
    addItemToCart(newItem)
  }
  return (
    <div className='grid grid-cols-3 gap-4'>
      {data.map((item) => (
        <div
          key={item.id}
          className='shadow-[3px_3px_2px_1px_var(--Rose-300)] p-4 rounded-[12px] '
        >
          <div className='relative mb-8'>
          <Image
            src={item.image.thumbnail}
            alt={item.name}
            width={300}
            height={300}
            className='relative'
          />
           <button className='flex gap-2 items-center w-36 p-2 bg-[var(--Rose-50)] rounded-full  border-2 border-[var(--Rose-500)] absolute -bottom-4 right-[50%] translate-x-[50%] hover:font-bold transition-all' onClick={()=>handleCart(item)}>
             <Image src='/images/icon-add-to-cart.svg' alt='delete' width={21} height={20} />
             Add to Cart
           </button>
           
           </div>
           <div>
            
           </div>
          <p>{item.category}</p>
          <p className='font-bold'>{item.name}</p>
          <p className='text-[var(--Rose-900)] font-semibold'>{item.price.toFixed(2)}$</p>
        </div>
      ))}
    </div>
  )
}

export default ListDesserts
