
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './pages/Signup'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import { useUserStore } from './store/useUserstore'
import { useEffect } from 'react'
import Loader from './components/Loader'
import CancelPage from './pages/CancelPage'
import SuccessPage from './pages/SuccessPage'


function App() {

  const { user, checkauth, checkingauth } = useUserStore()
  

  useEffect(() => {
    checkauth()
  }, [checkauth])

  if (checkingauth) {
    return <div className=' w-full min-h-screen bg-gray-900 flex justify-center items-center'>
      <Loader />
    </div>
  }

  return (
    <>
      <div className='min-h-screen bg-gray-900 text-white overflow-hidden py-20 relative box-border' >

        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,51,102,0.5)_0%,rgba(0,25,51,0.4)_45%,rgba(0,0,0,0.3)_100%)]' />
        </div>

        <div className='relative z-50 pt-10'>

          <Navbar />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={user?.role === "admin" ? <Dashboard /> : <Navigate to={'/'} />} />
            <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
            <Route path='/:category' element={<CategoryPage />} />
            <Route path='/cart' element={user ? <CartPage /> : <Navigate to={'/login'}/>} />
            <Route path='/success' element={user ? <SuccessPage /> : <Navigate to={'/login'}/>} />
            <Route path='/cancel' element={<CancelPage />} />
          </Routes>

        </div>

      </div>
    </>
  )
}

export default App
