import {prisma} from "../config/db"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { Request,Response } from "express"
import { config } from "dotenv"
const {sign} = Jwt
config()

export const signUp = async (req:Request,res:Response)=>{
    const {email,password} = req.body
    try{
        if(!email || !password){
            return res.status(401).json({Error:"Email and password required"})
        }

        const user = await prisma.user.findUnique({
            where:{email:email}
        })

        if(user){
            return res.status(404).json({Error:"User already exist"})
        }

        const passwordHash = await bcrypt.hash(password,10)

        const User = await prisma.user.create({
            data:{
                email:email,
                password:passwordHash
            }
        })

        res.json({
            Message:"User created Successfully",
            User:{Id:User.id,email:User.email}
        })
    }
    catch(err){
        res.status(500).json({Message:"Server Error"})
        console.log(err)
    }
}

export const signIn = async (req:Request,res:Response)=>{
    const {email,password} = req.body
    try{
        if(!email || !password){
            return res.status(401).json({Message:"Email and Password required"})
        }

        const user = await prisma.user.findUnique({
            where:{email:email}
        })

        if(!user){
            return res.status(404).json({Message:"Invalid credentials"})
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword){
            return res.status(403).json({Error:"Invalid credentials"})
        }

        const token = sign(
            {userId:user.id},
            process.env.JWT_SECRET!,
            {expiresIn:"1h"}
        )

        res.json({
            Message:"User login successfully",
            token:token,
            User:{Id:user.id,Email:user.email}
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Message:"Server Error"})
    }
}