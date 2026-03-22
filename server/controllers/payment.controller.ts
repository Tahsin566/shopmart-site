import { Request, Response } from "express";
import { stripe } from "../src";
import { Order } from "../models/order.model";
import { CartType } from "../server-side-types/cartTypes";


export const Checkout = async(req:Request<{},{}>,res:Response)=>{

    try {
        
        const {cart}:{cart:CartType[]} = req.body
        const {endpoint}:{endpoint:string} = req.body

        

        if(cart.length===0){
            res.status(400).json({error:'no item found'})
            return
        }

        let total = 0
        const lineitems = cart.map((item:CartType)=>{
            const amount = Math.round(item.price * 100)
            total += item.quantity * amount

            return {
                price_data:{
                    currency:"bdt",
                    product_data:{
                        name:item.name,
                        images:[item.image],
                    },
                    unit_amount:amount
                },
                quantity:item.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineitems,
            mode:'payment',
            success_url:`${endpoint}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${endpoint}/cancel`,
            metadata:{
                userId:JSON.stringify(req.user._id),
                products:JSON.stringify(
                    cart.map(c => ({
                        id:c._id,
                        quantity:c.quantity,
                        price:c.price
                    }))
                )

            }
        })

        res.status(200).json({id:session.id,url:session.url,total:total/100})
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }
}

export const MakeOrder = async(req:Request,res:Response)=>{
    try {
        const {sessionId}:{sessionId:string}= req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if(session.payment_status === "paid"){

            if(!session || !session.metadata || !session.amount_total) {
                res.status(400).json({})
                return
            }

            const purchasedItem : CartType[] = JSON.parse(session.metadata.products)

            const newOrder = new Order({
                user:JSON.parse(session.metadata.userId),
                products:purchasedItem.map((item)=>({
                    product:item.id,
                    quantity:item.quantity,
                    price:item.price
                })),
                totalAmount:session.amount_total /100,
                stripeSessionId:sessionId
            })

            await newOrder.save()

            res.status(200).json({message:'payment successful',success:true})
        }

    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }
}