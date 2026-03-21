import { motion } from 'framer-motion'
import {  Star } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';



const ProductsListTab = () => {

  const {products} = useProductStore()

  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
          <div className='flex justify-around bg-gray-600 px-4 py-2 rounded-t-lg'>
          <div className='flex gap-2'>
            <div className=' '>PRODUCTS</div>
            <div className=' '></div>
          </div>
            <div className=''>PRICE</div>
            {/* <div className='w-10 '>CATEGORY</div> */}
            <div className=' '>CATEGORY</div>
            <div className=' '>ISFEATURED</div>
            <div className=' '>ACTIONS</div>
            </div>


        <div className='w-full bg-gray-800 px-4 py-2 rounded-b-lg'>

          {/* <div className='flex justify-between bg-orange-600'>
          
            
          </div> */}
          
          {
            products.map((product:any) => (
              <>
                <div className='flex justify-around space-y-2 items-center'>
                  <div className='flex gap-2 items-center'>
                  <img src={product.image} className='w-8 h-8 rounded-full bg-white' alt="" />
                  <div className='w-40 '>{product.name}</div>
                  </div>
                  <div className='w-10'>${product.price}</div>
                  
                  <div className='w-40'>{product.category}</div>

                  <button className=' cursor-pointer' onClick={() => {}}>
                    <div className='w-20'>
                    <Star className={`${product.isFeatured === true ? 'bg-orange-600' : 'bg-gray-700'} rounded-full`} />
                    </div>
                  </button>
                  <button className=' cursor-pointer' onClick={()=>{
                    // const pid = products.filter((fproduct)=>fproduct.id !== product.id)
                    // setproducts(pid)
                  }}>
                    <div className='w-10'><product.actions  size={18} color='rgb(255,120,0)'/></div>
                  </button>
                </div>
              </>
            ))
          }
        </div>
      </motion.div>

    </>
  )
}

export default ProductsListTab