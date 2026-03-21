import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getProductsByCategory = async(req:Request,res:Response)=>{
    const {category} = req.params
    try {
        const categoryProducts = await Product.find({category:category})
        res.status(200).json({products:categoryProducts})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error})
        }
    }
}