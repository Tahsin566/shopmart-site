import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware'
import { getProductsByCategory } from '../controllers/product.controller'

const router = express.Router()

router.get('/:category',getProductsByCategory)

export {router as ProductRouter}