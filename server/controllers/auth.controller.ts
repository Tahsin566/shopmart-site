
import { Response, Request } from "express"
import mongoose from "mongoose"
import { User } from "../models/user.model"
import bcrypt from 'bcrypt'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { jwt_token_secret } from "../config/configEnv"


export const signup = async (req: Request, res: Response) => {

    const { username, email, password } = req.body

    try {

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: 'User exists' })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, password: hashpass, email })
        await newUser.save()

        const token = await jwt.sign({ id: newUser._id, email: newUser.email },jwt_token_secret, { expiresIn: "7d" })

        return res.cookie("token", token, { sameSite: "none", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).status(201).json({ message: 'successfully registered', userinfo: { username, email: newUser.email,role:newUser.role } })


    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: 'An error occurred' })
        }
    }

}

export const signin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        if (user && await bcrypt.compare(password, user.password)) {
            
            const token = await jwt.sign({ id: user._id, email: user.email },jwt_token_secret, { expiresIn: "7d" })

            return res.cookie("token", token, { sameSite: "none", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json({ message: 'successfully signed in', userinfo: { username: user.username, email: user.email,role:user.role } })
        }
        return res.status(400).json({ error: 'invalid email or password' })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred' })
        }
    }

}


export const signout = async (req: Request, res: Response) => {

    try {
        const token = req.cookies?.token as string
        if (token) {
            res.clearCookie('token')
        }

        try {
            const decode = await jwt.verify(token,jwt_token_secret) as JwtPayload
            res.status(200).json({ message: 'Successfully logged out' })
        } catch (error) {
            if(error instanceof Error){
                res.status(500).json({error:error.message})
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }


}

export const getprofile = (req: Request, res: Response) => {

    res.status(200).json({ user: req.user })

}