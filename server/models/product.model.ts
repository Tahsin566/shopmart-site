import mongoose, { InferSchemaType } from "mongoose";


const ProductSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Name is required'],
    },
    price:{
        type:Number,
        min:0,
        required:[true,'Price is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    image:{
        type:String,
        default:'no-image.png'
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    date_of_entry: {
        type: Date,
        default: Date.now()
    }
},{timestamps:true})

export type ProductModelType = InferSchemaType<typeof ProductSchema>

export const Product = mongoose.model<ProductModelType>('Product',ProductSchema)