import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../models/user.model";
import { jwt_token_secret } from "../config/configEnv";


export const protectedRoute = async(req:Request,res:Response,next:NextFunction)=>{

    const token = req.cookies.token as string

    if(!token){
        res.status(404).json({error:'token is not provided'})
        return
    }
    try {
        const decode = jwt.verify(token,jwt_token_secret) as JwtPayload
        const user = await User.findById(decode.id,{password:false,createdAt:false,updatedAt:false})
        if(!user){
            res.status(401).json({message:'Unauthorized'})
            return
        }

        req.user = user

        next()
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({error:error.message})
        }
    }

}

export const adminRoute = (req:Request,res:Response,next:NextFunction)=>{
    if(req.user.role !== 'admin') return res.status(401).json({message:'Unauthorized'})
    next()
}