import mongoose, { InferSchemaType } from "mongoose";

const OrderScheama = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                min: 0,
                required: true
            }

        }
    ],
    totalAmount: {
        type: Number,
        min: 0,
        required: true
    },
    stripeSessionId: {
        type:String,
        unique:true
    }

}, { timestamps: true })

export type OrderModelType = InferSchemaType<typeof OrderScheama>

export const Order = mongoose.model<OrderModelType>('Order', OrderScheama)





