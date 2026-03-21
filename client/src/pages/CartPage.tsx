import { ArrowRight, Info, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Cartitem from '../components/Cartitem'
import { useCartStore } from '../store/useCartStore'
import { useEffect } from 'react'
import { endpont, useUserStore } from '../store/useUserstore'
import toast from 'react-hot-toast'
import {loadStripe} from '@stripe/stripe-js'
import { stripe_public_key } from '../configEnv'

const stripeload = loadStripe(stripe_public_key)

const CartPage = () => {

  const { cart, getcart, loading } = useCartStore()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) toast.error('log in')
    getcart()
  }, [getcart])


  const total = cart.reduce((sum, cart) => {
    return cart.quantity * cart.price + sum
  }, 0)

  const handlepayment = async () => {

    const stripe = await stripeload
    if(!stripe) return

    if(cart.length === 0) return
    
    try {
      toast.success('Proceding to checkout',{icon:<Info color='white' className=' bg-blue-300 rounded-full' />,style:{fontWeight:'bold'}})
      const response = await fetch(`${endpont}/payment/checkout`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ cart })
      })
      const session = await response.json()
      
      console.log(session)
      await stripe.redirectToCheckout({sessionId:session.id})
      
    } catch (error) {
        toast.error('an error occurred')
    }
  }


  if (!loading && cart.length === 0) {
    return <div className='w-full flex flex-col h-96 justify-center items-center'>
      <ShoppingCart size={200} />
      <div className=' text-2xl font-bold text-center ml-5'>Cart empty</div>
    </div>
  }

  return <>

    <div className='w-full flex overflow-hidden p-3 gap-3 flex-wrap'>


      <div className='w-full flex flex-wrap gap-2 mx-auto'>

        <div className='lg:w-[1125px] md:w-full sm:w-full space-y-4 max-[640px]:w-full'>

          {cart.map((product) => (


              <Cartitem key={product._id} product={product} />


          ))}
        </div>

        {user && cart.length > 0 && <div className=' w-80 h-50 bg-gray-800 p-2 space-y-4'>
          <div>Order Summary</div>
          <div className='flex justify-between'>
            <div>Total</div>
            <div>{total}</div>
          </div>
          <button className='bg-blue-700 w-full rounded-md py-2 mt-5 text-center cursor-pointer' onClick={()=>{
            handlepayment()
          }}>Proceed to checkout</button>
          <Link to='/' className=' cursor-pointer text-center block' >
            or Continue shopping  <ArrowRight className=' inline' size={16} />
          </Link>
        </div>}
      </div>
    </div>

  </>
}

export default CartPage