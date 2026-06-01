
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
import { MongoConnect } from "../config/db";

const app = express()
dotenv.config()

app.use(express.json())
app.use(CookieParser())
app.use(cors({
    credentials:true,
    // origin : 'http://localhost:5173'
}))

export const stripe = new Stripe(stripe_secret_key)


app.use(express.static(path.join(__dirname,'../../client/dist')))

console.log(path.join(__dirname,'../../client/dist'))




app.use('/api/auth',Authrouter)
app.use('/api/cart',CartRouter)
app.use('/api/product',ProductRouter)
app.use('/api/payment',PaymentRouter)




app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../client/dist/index.html'))
})


app.listen(4000,async()=>{
    console.log('Server started at port 4000')
    console.log('waiting')
    await MongoConnect()
    
})