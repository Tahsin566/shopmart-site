import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsByCategory } from '../controllers/product.controller'
import { upload } from '../config/multer'
import { adminRoute, protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/all',protectedRoute,adminRoute,getProducts)
router.get('/:category',getProductsByCategory)
router.post('/add',protectedRoute,adminRoute,upload.single('image'),addProduct)
router.delete('/:id', protectedRoute,adminRoute, deleteProduct)

export {router as ProductRouter}