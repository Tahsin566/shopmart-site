import dotenv from 'dotenv'

dotenv.config()

export const mongo_url = process.env.MONGO_URL ? process.env.MONGO_URL : ""
export const mongo_url_dev = process.env.MONGO_URL_DEV ? process.env.MONGO_URL_DEV : ""
export const jwt_token_secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
export const stripe_secret_key = process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : ""