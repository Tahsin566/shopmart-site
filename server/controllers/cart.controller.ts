import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { MongooseType } from "../server-side-types/mongooseType";
import { Types } from "mongoose";
    
export const addToCart = async (req: Request, res: Response) => {

    try {

        const { productId }:{productId:Types.ObjectId} = req.body
        const { user } = req


        if(!user) return res.status(400).json({error:'User not found'})
        
        const existingItems = user.cartItems.find((item) => item.id === productId)

        if (existingItems) {
            existingItems.quantity += 1;
        }
        else {
            user.cartItems.push(productId)
            await user.save()
        }
        await user.save()

        res.status(201).json({ cart: user.cartItems })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }

}

export const getCartItems = async (req: Request, res: Response) => {

    try {
        const {user} = req
        if(!user) return res.status(400).json({})
        
        const products = await Product.find({ _id: { $in: user.cartItems } })

        const cartItems = products.map((product) => {
            const item = user.cartItems.find((cartitem) => cartitem.id === product.id)
            return { ...product.toJSON(), quantity: item?.quantity }
        })

        res.status(200).json({ cart: cartItems })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export const decrementQuantity = async(req: Request, res: Response) => {

    try {

        const { productId }:{productId:Types.ObjectId} = req.body
        const { user } = req
        if(!user) return res.status(400).json({})

        const existing = user.cartItems.find((item) => item.id === productId)

        
        if(!existing) return res.status(400).json({})

        if(existing.quantity > 1){
            existing.quantity -= 1
        }
        await user.save()

        res.status(200).json({message:"quantity is decreased"})
        
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }   
      
    
      
}

export const removeFromCart = async(req: Request, res: Response)=>{

    try {

        const { productId }:{productId:Types.ObjectId} = req.body
        const { user } = req as unknown as {user:{cartItems:{id:Types.ObjectId}[]}}
        if(!user){
            return res.status(400).json({})
        } 

        user.cartItems = user.cartItems.filter((item)=> item.id !== productId)
        await (user as MongooseType)?.save()

        res.status(200).json({message:'item removed from cart',cart:user.cartItems})

    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }
}

export const clearCart = async(req: Request, res: Response)=>{
    try {
        const {user} = req
        if(!user) return res.status(400).json({})
        user.cartItems.splice(0,user.cartItems.length)
        await user.save()
        res.status(200).json({message:'Cart cleared'})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }
}