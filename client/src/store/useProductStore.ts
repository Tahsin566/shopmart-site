import { create } from "zustand";
import { addProductType, ProductStoretype, ProductsType } from "../types/productTypes";
import { endpont } from "../../../url";
import toast from "react-hot-toast";


export const useProductStore = create<ProductStoretype>((set,get)=>({
    products:[],
    loading:false,

    fetchAllProducts : async()=>{
        set({loading:true})
        try {
            const response = await fetch(`${endpont}/product/all`,{credentials:'include'})
            const data = await response.json()
            console.log(data)
            if(response.ok){
                set({products:data.products})
            }
            set({loading:false})
        } catch (error) {
            set({products:[]})
            set({loading:false})
        }
    },

    fetchProductsbyCategory:async(category:string)=>{
        set({loading:true})
        try {
            const response = await fetch(`${endpont}/product/${category}`)
            const data:{products:ProductsType[]} = await response.json()
            console.log(data)
            if(response.ok){
                set({products:data.products})
            }
            console.log()
            set({loading:false})
        } catch (error) {
            set({products:[]})
            set({loading:false}) 
        }
    },

    addProduct :async(product:addProductType) => {
        set({loading:true})
        try {
            const response = await fetch(`${endpont}/product/add`,{
                method:'POST',credentials:'include',
                body: product as unknown as BodyInit,
                
            })
            const data:{product:ProductsType} = await response.json()
            if(response.ok){
                toast.success('Product added successfully',{id:'add-product'})
                set({products:[...get().products,data.product]})
            }
            set({loading:false})
        } catch (error) {
            set({loading:false})
            console.log(error)
        }
    },

    deleteProduct: async(id:string)=>{
        try {
            const response = await fetch(`${endpont}/product/${id}`,{method:'DELETE',credentials:'include'})
            if(response.ok){
                set((state) => ({ products: state.products.filter((product) => product._id !== id) }))
            }
        } catch (error) {
            console.log(error)
        }
    }

}))

