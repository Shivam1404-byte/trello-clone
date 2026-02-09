import {prisma} from '../config/db'
import { Request,Response } from 'express'

export const createListItem = async (req:Request,res:Response)=>{
    const {title,boardId} = req.body
    try{
        if(!title){
            return res.status(401).json({Error:"title required!"})
        }
        
        const checkBoardId = await prisma.board.findUnique({
            where:{
                id:boardId
            }
        })

        if(!checkBoardId){
            return res.status(404).json({Error:"No board found"})
        }

        const list = await prisma.list.create({
            data:{
                title:title,
                boardId:boardId
            }
        })

        res.json({
            Message:"List created Successfully",
            List:list
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

export const getListItem = async (req:Request,res:Response)=>{
    const {boardId} = req.body
    try{        
        const checkBoardId = await prisma.board.findUnique({
            where:{
                id:boardId
            }
        })

        if(!checkBoardId){
            return res.status(404).json({Error:"No board found"})
        }

        const list = await prisma.list.findMany({
            where:{
                boardId:boardId
            }
        })

        res.json({
            List:list
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

export const deleteListItem = async (req:Request,res:Response)=>{
    const {boardId} = req.body
    const {id} = req.params
    try{        
        const checkBoardId = await prisma.board.findUnique({
            where:{
                id:boardId
            }
        })

        if(!checkBoardId){
            return res.status(404).json({Error:"No board found"})
        }

        await prisma.list.delete({
            where:{
                id:id as string,
                boardId:boardId as string
            }
        })

        res.json({
            Message:"List deleted Successfully",
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}