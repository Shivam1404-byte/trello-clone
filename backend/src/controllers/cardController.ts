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