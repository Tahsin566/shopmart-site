
import express, { RequestHandler } from 'express'
import { addToCart, clearCart, decrementQuantity, getCartItems, removeFromCart} from '../controllers/cart.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/',protectedRoute,addToCart as RequestHandler)
router.get('/cartitem',protectedRoute,getCartItems as RequestHandler)
router.post('/updatequantity',protectedRoute,decrementQuantity as RequestHandler)
router.post('/remove',protectedRoute,removeFromCart as RequestHandler)
router.post('/clear',protectedRoute,clearCart as RequestHandler)

export {router as CartRouter}