import {prisma} from '../config/db'
import { Request,Response } from 'express'

export const createCard = async (req:Request,res:Response)=>{
    const {title,description,listId} = req.body
    try{
        if(!title || !description){
            return res.status(401).json({Error:"Title and description required"})
        }

        const checkList = await prisma.list.findUnique({
            where:{
                id:listId
            }
        })

        if(!checkList){
            return res.status(404).json({Error:"List not found"})
        }

        const card = await prisma.card.create({
            data:{
                title:title,
                description:description,
                listId:listId
            }
        })

        res.json({
            Message:"Card created Successfully",
            card:card
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
} 

export const getCard = async (req:Request,res:Response)=>{
    const listId = req.params.id
    try{
        const checkList = await prisma.list.findUnique({
            where:{
                id:listId as string
            }
        })

        if(!checkList){
            return res.status(404).json({Error:"List not found"})
        }

        const card = await prisma.card.findMany({
            where:{
                listId:listId as string
            }
        })

        res.json({
            card
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
} 

export const deleteCard = async (req:Request,res:Response)=>{
    const {listId} = req.body
    const {id} = req.params
    try{        
        const checkBoardId = await prisma.list.findUnique({
            where:{
                id:listId
            }
        })

        if(!checkBoardId){
            return res.status(404).json({Error:"No board found"})
        }

        await prisma.card.delete({
            where:{
                id:id as string,
                listId:listId
            }
        })

        res.json({
            Message:"Card deleted Successfully",
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}