import Jwt  from "jsonwebtoken";
import { config } from "dotenv";
import { Request,Response,NextFunction } from "express";
config()

declare global{
    namespace Express{
        interface Request{
            userId?:String
        }
    }
}

export const middleware = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({Error:"Token not provided"})
        }

        const decoded = Jwt.verify(token,process.env.JWT_SECRET!) as {userId : String}

        req.userId = decoded.userId

        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Invalid token"})
    }
}