import { useEffect, useState } from 'react'
import { Lock, ShoppingCart, UserPlus, LogOut, LogIn, Menu, X, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUserStore } from '../store/useUserstore'
import { useCartStore } from '../store/useCartStore'

const Navbar = () => {

  const {user,signOut} = useUserStore()
  const {cart,loading,getcart} = useCartStore()

  const [menuOpen, setmenuOpen] = useState(false)
  const [profile, setprofile] = useState(false)

  useEffect(() => {
    if (!user) return
    getcart()
  }, [getcart])

  return (
    <>
      <div className='flex justify-between p-4 text-white flex-wrap items-center border-b border-blue-900 fixed top-0 left-0 w-full bg-gray-950 z-30'>
        <Link to={'/'} className='font-bold text-2xl'>
          Shopmart
        </Link>
        <div className='flex max-[635px]:hidden justify-between gap-4 flex-wrap items-center'>
          <Link to={'/'}>Home</Link>
          {user && <Link to={'/cart'} className='flex justify-center items-center gap-2 relative'>
            <ShoppingCart size={18} />
            <div className='w-5 h-5 rounded-full bg-blue-800 absolute -top-2 left-2 flex justify-center items-center text-xs'>{user && !loading && cart?.length}</div>
            Cart
          </Link>}
          {user && <Link  onPointerEnter={()=>setprofile(true)} onPointerLeave={()=>setprofile(false)} className=' relative border cursor-pointer rounded-full border-neutral-400' to={'/'}><User />
          <div  className={`p-1 left-2 top-7 rounded-md bg-gray-800 absolute ${profile ?'visible':'hidden' } `}>
          <h1>{user?.username}</h1>
          <h1>{user?.email}</h1>
          </div>
          </Link>}
          {user?.role === "admin" && <Link to={'/dashboard'} className='flex justify-center items-center gap-2 bg-blue-800 p-2 rounded-md'>
            <Lock size={18} />
            Dashboard
          </Link>}
          {user ? <button className='flex justify-center cursor-pointer items-center gap-2 bg-neutral-700 p-2 rounded-md' onClick={signOut}>
            <LogOut />
            <div>Log out</div>
          </button> : (
            <>
              <Link to={'/signup'} className='flex justify-center items-center gap-2 bg-blue-800 p-2 rounded-md'>
                <UserPlus size={18} />
                Sign up
              </Link>

              <Link to={'/login'} className='flex justify-center items-center gap-2 bg-neutral-700 p-2 rounded-md'>
                <LogIn size={18} />
                Login
              </Link>


            </>
          )}
        </div>
        <button onClick={() => {
          setmenuOpen(!menuOpen)
          }} className='hidden max-[635px]:flex cursor-pointer active:cursor-default transition-all'>{menuOpen ? <X /> : <Menu color='white' />}</button>
      </div>

      {menuOpen &&
        <motion.div
          className=''
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5 }}
        >

          <div className='flex flex-col justify-start gap-4 p-4 text-white flex-wrap items-center border-b border-blue-900 fixed top-16 min-h-80 w-60 right-0 bg-gray-950 z-30'>
            {/* <div className='flex justify-between gap-4 flex-wrap items-center'> */}
            {user && <Link to={'/'}><User /></Link>}
            {user && <div className=' flex flex-col'>
            <h1 className=' text-center'>{user?.username}</h1>
            <h1>{user?.email}</h1>
            </div>}
            <Link className='' onClick={()=>{
              setmenuOpen(false)
            }} to={'/'}>Home</Link>
            {user && <Link onClick={()=>{
              setmenuOpen(false)}} to={'/cart'}  className='flex justify-center items-center gap-2 relative'>
              <ShoppingCart size={18} />
              <div className='w-5 h-5 rounded-full bg-blue-800 absolute -top-2 left-2 flex justify-center items-center text-xs'>{user && !loading && cart?.length}</div>
              Cart
            </Link>}
            {user?.role=="admin" && <Link to={'/dashboard'} className='flex justify-center items-center gap-2 bg-blue-800 p-2 rounded-md w-full'>
              <Lock size={18} />
              Dashboard
            </Link>}
            {user ? <button className='flex justify-center items-center gap-2 cursor-pointer bg-neutral-700 p-2 rounded-md w-full' onClick={signOut}>
              <LogOut />
              <div>Log out</div>
            </button> : (
              <>
                <Link to={'/signup'} className='flex justify-center items-center gap-2 bg-blue-800 p-2 rounded-md w-full'>
                  <UserPlus size={18} />
                  Sign up
                </Link>

                <Link to={'/login'} className='flex justify-center items-center gap-2 bg-neutral-700 p-2 rounded-md w-full'>
                  <LogIn size={18} />
                  Login
                </Link>

              </>
            )}
            {/* </div> */}
          </div>
        </motion.div>
      }



    </>


  )
}

export default Navbar