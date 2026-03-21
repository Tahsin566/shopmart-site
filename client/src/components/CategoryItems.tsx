
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserstore'
import toast from 'react-hot-toast'
import { ProductType } from '../types/productTypes'



const CategoryItems = ({product,product:{name,image,price,category}}:{product:ProductType}) => {

    const {addtocart} = useCartStore()
    const { user } = useUserStore()

    return (
        <>
            <div className='w-54 overflow-hidden space-y-2'>
                <img src={image} alt="" className={`${category === "Shoes" || category === "Glasses" ? ' object-contain' : ' object-cover'} mb-1  aspect-square w-full bg-white p-[0.5px] rounded-md`} />
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