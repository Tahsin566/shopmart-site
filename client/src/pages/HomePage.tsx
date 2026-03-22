import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { categories } from '../lib/data';


const HomePage = () => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='w-full flex flex-wrap justify-center items-center'>

          <div className='flex flex-col w-[900px]'>

          <h2 className='text-5xl text-center font-bold'>Explore our categories</h2>
          <p className='text-xl text-center my-2'>Discover the latest trends in eco-friendly fashion</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-10 gap-1 p-1 place-items-center'>
            {
              categories.map((category,i)=>(
                <Link key={i} className=' w-full overflow-hidden' to={category.href}>
                <img src={category.imageUrl} alt="jeans" className={`w-full h-80 rounded-lg bg-gray-600 object-cover aspect-square`}/>
                </Link>
              ))
            }
          </div>

          </div>
        </div>

      </motion.div>
    </>
  )
}

export default HomePage