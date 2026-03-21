
import express, { Application, RequestHandler } from 'express'
import { signin,signup,signout, getprofile } from '../controllers/auth.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/signup',signup as RequestHandler)
router.post('/signin',signin as RequestHandler)
router.post('/signout',signout as RequestHandler)
router.get('/profile',protectedRoute,getprofile)


export { router as Authrouter}