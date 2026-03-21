import {  Minus, Plus, Trash } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { CartItemProp } from '../types/cartTypes'


const Cartitem = ({product}:CartItemProp) => {

  const {addtocart,deleteFromCart,removeFromCart} = useCartStore()


  return (
    <>
        <div className='flex gap-3 flex-wrap items-center w-full bg-gray-800 rounded-md p-1 flex-1'>
          
                <img src={product.image} alt="" className='h-[160px] w-[210px] p-1 aspect-square rounded-md max-[456px]:w-full  object-cover bg-white' style={{ objectPosition: product.category === "T-Shirts" || product.category === "Jackets" ? '50% 38%' : '50% 55%' }} />

                <div className='h-full flex flex-col justify-between py-4 space-y-3 flex-[0.5]'>
                  <h2>{product.name}</h2>
                  <h2 className='text-sm font-bold text-gray-400'>{product.category}</h2>
                  <button onClick={()=>{
                    removeFromCart(product._id)
                  }} className=' mt-5 cursor-pointer'>
                  <Trash color='rgba(255,0,0,0.6)' />
                  </button>
                </div>

                <div className='flex flex-[0.4] gap-2'>
                  <button onClick={()=>{
                    deleteFromCart(product)
                  }} className=' bg-gray-700 px-2 flex justify-center items-center rounded-md cursor-pointer'><Minus size={9} /></button>
                  <h1>{product.quantity}</h1>
                  <button onClick={()=>{
                    addtocart(product)
                  }} className='bg-gray-700 px-1 rounded-md cursor-pointer'><Plus size={16} /></button>
                </div>
                <div>{product.price * product.quantity} BDT</div>
              </div>
    </>
  )
}

export default Cartitem