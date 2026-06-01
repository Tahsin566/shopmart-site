import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/useProductStore'
import { Edit, Star, Trash } from 'lucide-react'
import { ProductsType } from '../types/productTypes'





const ProductsListTab = () => {

  const { products, fetchAllProducts, deleteProduct } = useProductStore()

  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')



  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  const Modal = ({product}:{product:ProductsType}) => {

  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=' mx-auto bg-gray-900'
      >
        <div className='flex flex-col gap-2 h-32 w-52 rounded-md justify-center p-2 mx-auto'>

          <img src={product?.image || ''} alt="product" className='h-40 w-52.5 p-1 aspect-square rounded-md max-[456px]:w-full  object-cover bg-white' />

          <h1>Are you sure you intend to delete the product : {product?.name || ''} ? </h1>
          <div className='flex justify-between'>
            <button className='bg-red-600 p-2 rounded-md' onClick={async() => {
              await deleteProduct(productId)
              setOpen(false)
            }}>Confirm</button>
            <button className='bg-gray-600 p-2 rounded-md' onClick={() => setOpen(false)}>No</button>
          </div>
        </div>
      </motion.div>
    )
  }


  // if (open) {
  //   return <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ duration: 0.5 }}>
  //     <div className='flex flex-col gap-2 h-32 w-52 border rounded-md justify-center p-2 mx-auto'>

  //       <h1>Are you sure ? </h1>



  //       <div className='flex justify-between'>

  //         <button className='bg-red-600 p-2 rounded-md' onClick={async () => {
  //           await deleteProduct(productId)
  //           setOpen(false)
  //         }}>Confirm</button>

  //         <button className='bg-gray-600 p-2 rounded-md' onClick={() => setOpen(false)}>No</button>
  //       </div>

  //     </div>
  //   </motion.div>
  // }

  if(open){
    return <div className='mx-auto w-54'>
      <Modal product={products.find(product => product._id === productId)!}/>
    </div>
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className=' grid gap-2'>

          {products.map((product, _i) => (

            <div className='relative grid grid-cols-1 mx-auto  md:grid-cols-2 lg:grid-cols-3 md:flex-wrap-reverse rounded-md  bg-gray-800 p-2 justify-between gap-4 items-center'>
              <div>
                <img src={product.image} alt="hello" className='h-32 border border-gray-600 rounded-md bg-white w-50 object-contain' />
              </div>

              <div className=''>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <div>{product.description}</div>
              </div>

              <div className='space-y-2 w-20 ml-auto'>
                <Star />
                <button><Edit /></button>
                <div>
                  <button onClick={() => {
                    setProductId(product._id)
                    setOpen(true)
                  }}><Trash /></button>
                </div>
              </div>
              
            </div>
          ))}

        </div>

      </motion.div>

    </>
  )
}

export default ProductsListTab