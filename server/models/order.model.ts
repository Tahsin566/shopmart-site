import mongoose, { InferSchemaType } from "mongoose";

const OrderScheama = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product is required']
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                default: 0,
            }

        }
    ],
    totalAmount: {
        type: Number,
        default: 0,
    },
    stripeSessionId: {
        type:String,
        unique:[true,'Stripe session id must be unique']
    }

}, { timestamps: true })

export type OrderModelType = InferSchemaType<typeof OrderScheama>

export const Order = mongoose.model<OrderModelType>('Order', OrderScheama)





