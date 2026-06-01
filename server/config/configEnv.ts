import dotenv from 'dotenv'

dotenv.config()

export const mongo_url = process.env.MONGO_URL ? process.env.MONGO_URL : ""
export const mongo_url_dev = process.env.MONGO_URL_DEV ? process.env.MONGO_URL_DEV : ""
export const mode = process.env.MODE ? process.env.MODE : "development"
export const jwt_token_secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
export const stripe_secret_key = process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""

export const cloudinary_cloud_name = process.env.CLOUDINARY_NAME ? process.env.CLOUDINARY_NAME : ""
export const cloudinary_api_key = process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY : ""
export const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET : ""