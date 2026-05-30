
import express, { Application, RequestHandler } from 'express'
import { signin,signup,signout, getprofile } from '../controllers/auth.controller'
import { protectedRoute } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signout)
router.get('/profile',protectedRoute,getprofile)


export { router as Authrouter}