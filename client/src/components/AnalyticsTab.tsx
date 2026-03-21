import { motion } from 'framer-motion'
import { User } from 'lucide-react'

const AnalyticsTab = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
      >
        
     <div className='w-full bg-gray-800 min-h-screen p-2'>

      <div className='flex gap-2 flex-wrap justify-center'>

        <div className='w-[210px] h-50 bg-blue-600 rounded-lg flex justify-end relative'>
          <User size={120} color='rgba(255,255,255,0.1)' />
          <h1 className='absolute left-2 bottom-12 text-2xl'>Total user</h1>
          <h2 className='absolute left-2 bottom-5 text-xl'>46</h2>
        </div>

        <div className='w-[210px] h-50 bg-blue-600 rounded-lg'></div>
        <div className='w-[210px] h-50 bg-blue-600 rounded-lg'></div>
        <div className='w-[210px] h-50 bg-blue-600 rounded-lg'></div>
      </div>

      <div className='w-full h-screen mt-3 bg-gray-800'></div>

     </div>
      </motion.div>
  )
}

export default AnalyticsTab