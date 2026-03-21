import { ArrowRight, Lock, LogIn, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserstore'
import { useState } from 'react'

const LoginPage = () => {

  const {signIn,checkvalid,loading} = useUserStore()

  const [formdata, setformdata] = useState({
    email:'',
    password:''
  })


  return (
    <>
      <div className='flex justify-center items-center flex-wrap p-2'>

        <div className='w-[400px]'>

          <motion.div
            className=''
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='my-6 font-extrabold text-center text-3xl text-blue-500'>Log in to your account</h2>
          </motion.div>

          <motion.div
            className=''
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='bg-gray-800 w-full p-4'>
              <form onSubmit={(e)=>{
                e.preventDefault()
                if(checkvalid(formdata.email,formdata.password) === true) signIn(formdata.email,formdata.password)
              }} className='flex flex-col '>
                <label htmlFor="email" >Email address</label>

                <div className='flex bg-gray-700 items-center p-1 gap-2 rounded-md mb-3 border border-gray-700 focus-within:border focus-within:border-blue-700 '>
										<Mail size={20} />
									
										<input type="text" name="name" id="" onChange={(e)=>setformdata({...formdata,email:e.target.value})} placeholder='Enter your email' className='w-full focus:border-none focus:outline-none' />
									
								</div>
                <label htmlFor="password" >Password</label>

                <div className='flex bg-gray-700 items-center p-1 gap-2 rounded-md mb-3 border border-gray-700 focus-within:border focus-within:border-blue-700'>
										<Lock size={20} />
									
										<input type="password" name="name" id="" onChange={(e)=>setformdata({...formdata,password:e.target.value})} placeholder='**********' className='w-full focus:border-none focus:outline-none' />
									
								</div>
                <button type='submit' className=' bg-blue-700 flex justify-center items-center p-2 rounded-md my-2 gap-2 cursor-pointer disabled:bg-blue-800' disabled={loading}>
									<LogIn size={18} className='mt-[2px]'/>
									<h1>Log in</h1>
								</button>
                <div className=' flex gap-2 items-center'>
                <h1>Don't have an account?</h1>

                <Link to={'/signup'}  className=' flex items-center gap-1'>
                <h2 className=' text-blue-400'>Sign up</h2>
                  <ArrowRight size={18} className=' mt-2 text-blue-500' />
                  </Link>
                </div>
              </form>
            </div>

          </motion.div>

        </div>
      </div>


    </>
  )
}

export default LoginPage