import { create } from "zustand";
import { ProductStoretype, ProductType } from "../types/productTypes";

export const endpont = 'http://localhost:4000'

export const useProductStore = create<ProductStoretype>((set,_get)=>({
    products:[],
    loading:false,

    fetchProductsbyCategory:async(category:string)=>{
        set({loading:true})
        try {
            const response = await fetch(`${endpont}/products/${category}`,{credentials:'include'})
            const data:{products:ProductType[]} = await response.json()
            if(response.ok){
                set({products:data.products})
            }
            set({loading:false})
        } catch (error) {
            set({products:[]})
            set({loading:false}) 
        }
    }

}))