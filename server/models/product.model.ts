import mongoose, { InferSchemaType } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:true,
        default:false
    }
})

export type ProductModelType = InferSchemaType<typeof ProductSchema>

export const Product = mongoose.model<ProductModelType>('Product',ProductSchema)