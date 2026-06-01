import { CartProp } from "./cartTypes"

export type ProductType = Omit<CartProp,"quantity">

export type ProductsType = {
    _id:string,
    name:string,
    price:number,
    description: string,
    image:string,
    category:string
}


export type addProductType = {
    name:string,
    price:string,
    description: string,
    image:File,
    category:string
}

export type ProductStoretype = {
    products:ProductsType[],
    loading:boolean,
    fetchAllProducts:()=>Promise<void>
    fetchProductsbyCategory:(category:string)=>Promise<void>
    addProduct:(product:addProductType)=>Promise<void>
    deleteProduct:(id:string)=>Promise<void>

}