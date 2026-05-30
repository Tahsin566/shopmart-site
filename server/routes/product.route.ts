import express from 'express'
import { getProductsByCategory } from '../controllers/product.controller'

const router = express.Router()

router.get('/:category',getProductsByCategory)

export {router as ProductRouter}