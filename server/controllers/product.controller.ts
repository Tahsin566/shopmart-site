import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { remove, uploadFile } from "../config/cloudinary";


export const getProducts = async(req:Request,res:Response)=>{

    try {
        const products = await Product.find()
        res.status(200).json({products})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error})
        }
    }
}

export const getProductsByCategory = async(req:Request,res:Response)=>{

    const {category} = req.params

    try {
        const categoryProducts = await Product.find({category:category.toString().toLowerCase()})
        res.status(200).json({products:categoryProducts})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error})
        }
    }
}

export const addProduct = async(req:Request,res:Response)=>{

    console.log(req.body)
    // console.log('image',req.file?.buffer.toString('base64'))

    try {
        const product = await Product.create({
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            image: await uploadFile(req.file?.buffer as Buffer)
        })
        res.status(200).json({product})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error})
        }
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{

    const {id} = req.params

    const product = await Product.findById(id)

    await remove(product?.image as string)

    try {
        const product = await Product.deleteOne({_id:id})
        res.status(200).json({product})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error})
        }
    }
}