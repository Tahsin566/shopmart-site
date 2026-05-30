
import express, { RequestHandler } from 'express'
import { addToCart, clearCart, decrementQuantity, getCartItems, removeFromCart} from '../controllers/cart.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/',protectedRoute,addToCart )
router.get('/cartitem',protectedRoute,getCartItems )
router.post('/updatequantity',protectedRoute,decrementQuantity )
router.post('/remove',protectedRoute,removeFromCart )
router.post('/clear',protectedRoute,clearCart )

export {router as CartRouter}