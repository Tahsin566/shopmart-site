import express, { Application, RequestHandler } from 'express'
import { Checkout, MakeOrder } from '../controllers/payment.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/checkout',protectedRoute,Checkout)
router.post('/order',protectedRoute,MakeOrder)

export {router as PaymentRouter}