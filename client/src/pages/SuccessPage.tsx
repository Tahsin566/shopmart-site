import { Check } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useSearchParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

const SuccessPage = () => {

  const {clearCart} = useCartStore()

  let [sessionId,_setSessionId] = useSearchParams()
  console.log(sessionId.get('session_id'))

  const processPayment = async()=>{

    try {
      const response = await fetch('https://shopmart-site.onrender.com/payment/order',{
        method:'POST',
        credentials:'include',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({sessionId:sessionId.get('session_id')})
      })
      const payment = await response.json()
      console.log(payment)
      if(payment.success){
        toast.success('payment processed successfully')
      }
      clearCart()
    } catch (error) {
      console.log(error)
      toast.error('an error occurred')
    }
  }

  useEffect(()=>{
    processPayment()
  },[processPayment])

  return (
    <div className='w-full flex justify-center items-center min-h-[70vh] p-1'>
        <div className=' bg-gray-800 w-[600px] min-h-[30vh] flex flex-col justify-center items-center gap-5 rounded-md'>

            <Check className=' bg-green-600 rounded-full p-1'/>
            <div className='font-bold text-2xl text-center'>Payment successful</div>

            <Link to={'/'} className=' bg-blue-700 p-2 rounded-md'>Return to home page</Link>

        </div>
    </div>
  )
}

export default SuccessPage