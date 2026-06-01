
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserstore'
import toast from 'react-hot-toast'
import { ProductType } from '../types/productTypes'



const CategoryItems = ({product,product:{name,image,price}}:{product:ProductType}) => {

    const {addtocart} = useCartStore()
    const { user } = useUserStore()

    return (
        <>
            <div className='w-70 overflow-hidden space-y-2 '>
                <div className='w-full min-h-80 flex items-end  bg-white rounded-md' >
                <img src={image} alt="" className={` p-[0.5px] rounded-md`} />
                </div>
                <div>{name}</div>
                <div>{price} BDT</div>
                <button onClick={()=>{
                    if(!user){
                        toast.error('You need to log in',{id:'a'})
                        return
                    }
                    addtocart(product as ProductType)
                }} className=' bg-blue-700 px-4 w-full py-2 rounded-md cursor-pointer'>Add to cart</button>
            </div>
        </>
    )
}

export default CategoryItems