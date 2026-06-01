import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CategoryItems from '../components/CategoryItems';
import { useProductStore } from '../store/useProductStore';
import Loader from '../components/Loader';


const CategoryPage = () => {

  const {category} = useParams()
  const {products,loading,fetchProductsbyCategory} = useProductStore()
  const itemcategory = category?.charAt(0).toUpperCase().concat(category.slice(1))
  console.log(itemcategory)

  useEffect(()=>{
    fetchProductsbyCategory(itemcategory as string)
    console.log(products)
  },[fetchProductsbyCategory])

  if(loading){
    return <div className=' w-full min-h-screen bg-gray-900 flex justify-center items-center'>
    <Loader />
  </div>
  }

  return (
    <div className='px-10 overflow-hidden'>
        <h2 className='text-center mb-20 text-3xl font-bold'>{category?.charAt(0)?.toUpperCase()}{category?.slice(1)}</h2>
        <div className='flex justify-center'>
          <div className='flex flex-wrap gap-5 justify-center'>

          {products.map((product,i)=>(
            <>
              <CategoryItems key={i} product={product}  />
  
            </>
          ))}
          </div>

          {!loading && products.length === 0 && <div className=' text-center text-2xl font-bold'>No products found</div>}

        </div>
    </div>
  )
}

export default CategoryPage