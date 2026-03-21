import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CategoryItems from '../components/CategoryItems';
import { useProductStore } from '../store/useProductStore';
import Loader from '../components/Loader';


const CategoryPage = () => {

  const {category} = useParams()
  const {products,loading,fetchProductsbyCategory} = useProductStore()
  const itemcategory = category?.charAt(0).toUpperCase().concat(category.slice(1))

  useEffect(()=>{
    fetchProductsbyCategory(itemcategory as string)
  },[fetchProductsbyCategory])

  if(loading){
    return <div className=' w-full min-h-screen bg-gray-900 flex justify-center items-center'>
    <Loader />
  </div>
  }

  return (
    <div className='px-10 overflow-hidden'>
        <h2 className='text-center text-blue-400 mb-20 text-3xl font-bold'>{category?.charAt(0)?.toUpperCase()}{category?.slice(1)}</h2>
        <div className='flex flex-wrap gap-8 justify-center'>
          {products.map((product,i)=>(
              <CategoryItems key={i} product={product}  />
          ))}

          {!loading && products.length === 0 && <div className=' text-center text-2xl font-bold'>No products found</div>}

        </div>
    </div>
  )
}

export default CategoryPage