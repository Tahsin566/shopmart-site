import { motion } from 'framer-motion'
import { PlusCircle, Upload } from 'lucide-react'
// import { useState } from 'react';

const AddProductTab = () => {

  const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  // const [category, setCategory] = useState('');
  // const [image, setImage] = useState('');


  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className=' bg-gray-800 sm:mx-12 md:mx-20 lg:mx-40 p-5 rounded-md min-h-[96vh] flex items-center'>

          <div className='w-full'>
          <h1 className='text-2xl font-bold text-blue-500 mb-4'>New product</h1>
            <form onSubmit={(e) => { e.preventDefault() }}>
              <label htmlFor="name" >Product name</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <input type="text" name="name" id="" className='w-full focus:border-none focus:outline-none' />

              </div>
              <label htmlFor="name" >Description</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <textarea name="name" id="" className='w-full focus:border-none focus:outline-none' rows={5} />

              </div>

              <label htmlFor="name" >Price</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <input type="number" name="name" id="" className='w-full focus:border-none focus:outline-none' step={0.01} />
              </div>

              <label htmlFor="name" id='categories' >Category</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <select id='categories' className='w-full focus:border-none focus:outline-none text-white bg-gray-700 py-2 block'>
                <option value=''>Select a category</option>
                  {categories.map((category)=>(
                    <option>{category}</option>
                  ))}
                </select>
              </div>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md my-2 w-[200px] justify-center' >

                <input type="file" className='sr-only' accept='image/*' id='image' />
                <Upload size={20} />
                <label htmlFor="image" className=' cursor-pointer'>Upload an image</label>

              </div>

              <button type='submit' className=' bg-blue-700 flex justify-center items-center p-2 mt-2 gap-2 rounded-md w-full'>
                <PlusCircle size={20} />
                <h1>New product entry</h1>
              </button>

            </form>
          </div>

        </div>

      </motion.div>
    </>
  )
}

export default AddProductTab