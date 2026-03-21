import { CartProp } from "./cartTypes"

export type ProductType = Omit<CartProp,"quantity">

export type ProductStoretype = {
    products:ProductType[],
    loading:boolean,
    fetchProductsbyCategory:(category:string)=>Promise<void>

}