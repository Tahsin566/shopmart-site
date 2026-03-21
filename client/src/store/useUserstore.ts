import toast from "react-hot-toast";
import { create } from "zustand";
import { UserStoreType } from "../types/userTypes";
import { Responsetype } from "../types/ResponseTypes";

export const endpont = 'https://shopmart-site.onrender.com'

export const useUserStore = create<UserStoreType>((set, _get) => ({

    user: null,
    loading: false,
    checkingauth: true,

    checkvalid: (email: string, password: string) => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const result = emailRegex.test(email);

        if (result === false) {
            toast.error("Invalid email")
            return false
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return false
        }

        return true


    },
    signUp: async (formdata:{
        username:string,
        email:string,
        password:string,
        confirmPassword:string
    }) => {

        set({ loading: true })

        if (!(formdata.username && formdata.email && formdata.password && formdata.confirmPassword)) {
            toast.error("Missing fields")
            return
        }

        if (formdata.password !== formdata.confirmPassword) {
            toast.error('Password dont match')
            return
        }


        try {

            const response = await fetch(`${endpont}/auth/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(formdata)
            })
            const data:Responsetype = await response.json()
            if (response.ok) {
                toast.success(data.message)
                set({ user: data.userinfo })
            }
            else {
                toast.error(data.error)
            }
            set({ loading: false })
        } catch (error) {
            set({ loading: false })
        }

    },
    signIn: async (email, password) => {

        set({ loading: true })

        if (!(email && password)) {
            toast.error("Missing fields")
            return
        }

        try {
            const response = await fetch(`${endpont}/auth/signin`, {
                method: 'POST',
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data:Responsetype = await response.json()
            if (response.ok) {
                toast.success(data.message)
                set({ user: data.userinfo })
            }
            else {
                toast.error(data.error)
            }
            set({ loading: false })
        } catch (error) {
            set({ loading: false })
        }

    },
    checkauth: async () => {

        set({ checkingauth: true })
        try {
            const response = await fetch(`${endpont}/auth/profile`, { credentials: 'include' })
            const data:Responsetype = await response.json()
            
            if(data.user){
                set({user:data.user})
            }
            else{
                set({user:null})
            }
            set({ checkingauth: false })

        } catch (error) {
            set({ user: null })
            set({ checkingauth: false })
        }
    },
    signOut: async () => {
        try {
            const response = await fetch(`${endpont}/auth/signout`, {
                method: 'POST',
                credentials: "include"
            })
            if(response.ok){
                set({ user: null })
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error("an error occurred during logout")
            }
        }
    }

}))