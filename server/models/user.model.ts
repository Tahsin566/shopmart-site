import mongoose, { InferSchemaType, Types } from "mongoose";



const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters long"],

    },
    cartItems:[
            {
                quantity: {
                    type: Number,
                    default: 1
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            }
        ],
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }



}, { timestamps: true })

export type UserModelType = InferSchemaType<typeof UserSchema>


export const User = mongoose.model<UserModelType>('User', UserSchema)

