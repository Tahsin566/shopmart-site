import { useState } from 'react'
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react'
import {motion} from 'framer-motion'
import AnalyticsTab from '../components/AnalyticsTab'
import ProductsListTab from '../components/ProductsListTab'
import CreateProductTab from '../components/AddProductTab'

const Dashboard = () => {

  const [tabs, settabs] = useState(1)
  
  const alltabs = [
    {id:1,name:"Product entry",icon:PlusCircle},
    {id:2,name:"Product",icon:ShoppingBasket},
    {id:3,name:"Analytics",icon:BarChart},
  ]

  return (
    <>

        <div className='flex justify-center items-center flex-wrap px-2'>


            <div className='w-[900px] justify-center'>
              <motion.h1
              className='text-3xl font-extrabold text-blue-500 text-center my-6'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              >Admin Dashboard</motion.h1>

              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8}}
              >

              <div className='flex  justify-center gap-4 flex-wrap mb-8'>

                {alltabs.map((tab)=>(

              <button onClick={()=>settabs(tab.id)} key={tab.id} className={`flex items-center gap-2 ${tabs == tab.id ? ' bg-blue-700':'bg-gray-700'}  px-4 py-2 rounded-md cursor-pointer transition-all`}>
                  <tab.icon size={18}/>
                  <h2>{tab.name}</h2>
                </button>

                ))}
                

              </div>

              {tabs === 1 && <CreateProductTab />}
              {tabs === 2 && <ProductsListTab />}
              {tabs === 3 && <AnalyticsTab />}

              </motion.div>

            </div>

        </div>


    </>
  )
}

export default Dashboard