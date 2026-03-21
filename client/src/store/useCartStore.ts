
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { CartProp, CartStoreType } from '../types/cartTypes'
import { ProductType } from '../types/productTypes'

export const endpont = 'https://shopmart-site.onrender.com'


export const useCartStore = create<CartStoreType>((set, get) => ({
    cart: [],
    loading: false,
    addtocart: async (product:ProductType) => {

        try {

            const { cart } = get()
            const existing = cart.find((cartproduct) => cartproduct._id === product._id)

            set((state) => {
                const newCart = existing ? (state.cart.map((item) => (
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                ))) : [...state.cart, { ...product, quantity: 1 }];
                return { cart: newCart }
            })

            const response = await fetch(`${endpont}/cart/`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: product._id })
            })

            if(!response.ok) return

            if (!existing) {

                toast.success('Added to cart', { id: 'b' })
            }
            else {

                toast.success('Quantity updated', { id: 'p' })
            }


        } catch (error) {
            toast.error('an error occurred')

        }

    },
    deleteFromCart: async (product: CartProp) => {

        try {
            const { removeFromCart } = get()

            if (product.quantity === 1) {
                removeFromCart(product._id)
                return
            }

            set((state) => {
                const existing = state.cart.find((item) => item._id === product._id);
                const newCart = existing
                    ? state.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
                    )
                    : state.cart.filter((item) => item._id === product._id);
                return { cart: newCart };
            })

            const response = await fetch(`${endpont}/cart/updatequantity`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id })
            })

            if(!response.ok) return
        
        } catch (error) {
            toast.error('an error occurred')
        }
    },

    removeFromCart: async (id: string) => {
        try {
            const response = await fetch(`${endpont}/cart/remove`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ productId: id })
            })
            if(!response.ok) return
            set((state) => ({ cart: state.cart.filter((cartproduct) => cartproduct._id !== id) }))

        } catch (error) {
            toast.error('an error occurred')
        }
    },
    getcart: async () => {
        set({loading:true})
        try {
            const response = await fetch(`${endpont}/cart/cartitem`, { credentials: 'include' })
            const data:{cart:CartProp[]} = await response.json()
            if(!response.ok) return
            set({ cart: data.cart })
            set({loading:false})

        } catch (error) {
            toast.error('an error occurred')
            set({loading:false})
        }
    },
    clearCart: async () => {

        try {
            const response = await fetch(`${endpont}/cart/clear`, {
                credentials: 'include',
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })
            if(!response.ok) return
            set({ cart: [] })

        } catch (error) {
            console.log(error)
        }
    }

}))