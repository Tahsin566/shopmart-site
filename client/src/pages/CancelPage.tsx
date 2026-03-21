import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const CancelPage = () => {
  return (
    <div className='w-full flex justify-center items-center min-h-[70vh] p-1'>
    <div className=' bg-gray-800 w-[600px] min-h-[30vh] flex flex-col justify-center items-center gap-5 rounded-md'>

        <X className=' bg-red-700 rounded-full p-1' />
        <div className='font-bold text-2xl text-center'>Payment was canceled</div>

        <Link to={'/'} className=' bg-blue-700 p-2 rounded-md'>Return to home page</Link>

    </div>
</div>
  )
}

export default CancelPage