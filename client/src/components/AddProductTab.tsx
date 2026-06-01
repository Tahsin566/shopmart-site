import { motion } from 'framer-motion'
import { PlusCircle, Upload } from 'lucide-react'
import { useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { addProductType } from '../types/productTypes';
import toast from 'react-hot-toast';
// import { useState } from 'react';

const AddProductTab = () => {

  const {addProduct} = useProductStore()

  const categories = ["jeans", "t-shirt", "shoes", "glasses", "jacket", "suit", "bag"];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState('');


  const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    setImage(file);

  };

  const handleAddProduct = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('category', category);
    formdata.append('image', image as File);

    if(!name || !description || !price || !category || !image) {
      toast.error('Missing fields', {id:'a'})
      return
    }

    try {
      await addProduct(formdata as unknown as addProductType)
    } catch (error) {
      throw new Error('Failed to add product' + error)
    }
  }
  

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
            <form onSubmit={handleAddProduct} >
              <label htmlFor="name" >Product name</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <input type="text" name="name" id="" className='w-full focus:border-none focus:outline-none' onChange={(e) => setName(e.target.value)} />

              </div>
              <label htmlFor="name" >Description</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <textarea name="name" id="" className='w-full focus:border-none focus:outline-none' rows={5} onChange={(e) => setDescription(e.target.value)} />

              </div>

              <label htmlFor="name" >Price</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <input type="number" name="name" id="" className='w-full focus:border-none focus:outline-none' step={0.01} onChange={(e) => setPrice(e.target.value)} />
              </div>

              <label htmlFor="name" id='categories' >Category</label>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md mb-3 mt-1'>
                <select id='categories' className='w-full focus:border-none focus:outline-none text-white bg-gray-700 py-2 block' onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Select a category</option>
                  {categories.map((category)=>(
                    <option>{category}</option>
                  ))}
                </select>
              </div>

              <div className='flex bg-gray-700 items-center p-2 gap-2 rounded-md my-2 w-50 justify-center' >

                <input type="file" className='sr-only' formEncType='multipart/form-data' accept='image/*' id='image' name='image' onChange={handleImageChange} />
                <Upload size={20} />
                <label htmlFor="image" className=' cursor-pointer'>Upload an image</label>

              </div>

              {preview && <img src={preview} alt="" className='w-80 h-60 object-contain mx-auto' />}

              <button type='submit' className=' bg-blue-700 flex justify-center items-center p-2 mt-2 gap-2 rounded-md w-full active:scale-95 transition-all'>
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