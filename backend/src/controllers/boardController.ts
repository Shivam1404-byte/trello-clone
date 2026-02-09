import {prisma} from "../config/db"
import { Request,Response } from "express"


export const createBoard = async(req:Request,res:Response)=>{
    try{
        const {title} = req.body
        const userId = req.userId!

        await prisma.board.create({
            data:{
                title:title,
                owner:userId as string
            }
        })

        res.status(200).json({
            Message:"Task Created Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Message:"Server Error"})
    }
}

export const getBoard = async(req:Request,res:Response)=>{
    try{
        const userId = req.userId!

        const board = await prisma.board.findMany({
            where:{
                owner:userId as string
            }
        })

        res.json({
            board
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server error"})
    }
}

export const deleteBoard = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const userId = req.userId!

        const board = await prisma.board.findUnique({
            where:{
                id:id as string,
                owner:userId as string
            }
        })

        if(!board){
            return res.status(404).json({Error:"Board not found"})
        }

        await prisma.board.delete({
            where:{
                id:id as string,
                owner:userId as string
            }
        })

        res.json({
            Message:"Board deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}