
import express,{Application, Request,Response} from "express";
import { Authrouter } from "../routes/auth.route";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import CookieParser from 'cookie-parser'
import path from "path";
import cors from 'cors'
import { CartRouter } from "../routes/cart.route";
import { ProductRouter } from "../routes/product.route";
import { PaymentRouter } from "../routes/payment.route";
import Stripe from 'stripe'
import {mongo_url,mongo_url_dev, stripe_secret_key} from '../config/configEnv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(CookieParser())
app.use(cors({
    credentials:true
}))

export const stripe = new Stripe(stripe_secret_key)


app.use(express.static(path.join(__dirname,'../../client/dist')))

console.log(path.join(__dirname,'../../client/dist'))


const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MODE === "production" ? mongo_url_dev:mongo_url)
        
        if (conn) {
            console.log("Connected")
        }
    } catch (error) {
        console.log("Not connected")
        process.exit(1)
    }
}



app.use('/auth',Authrouter)
app.use('/cart',CartRouter)
app.use('/products',ProductRouter)
app.use('/payment',PaymentRouter)




app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../client/dist/index.html'))
})


app.listen(4000,async()=>{
    console.log('Server started at port 4000')
    console.log('waiting')
    await connect()
    
})