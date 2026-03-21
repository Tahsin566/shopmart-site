import { ProductType } from "./productTypes"


export type CartProp = {
    _id: string,
    id: number,
    image: string
    name: string
    price: number
    quantity: number
    category: string
}

export type CartItemProp = {
    product:CartProp
}

export type CartStoreType = {
    cart: CartProp[],
    loading: boolean,
    addtocart: (product: ProductType) => Promise<void>
    deleteFromCart: (product: CartProp) => Promise<void>
    removeFromCart: (id: string) => Promise<void>,
    getcart: () => Promise<void>
    clearCart: () => Promise<void>
}
