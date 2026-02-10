import { Router } from "express";
import { createCard, deleteCard, getCard } from "../controllers/cardController";


export const cardRoute = Router()

cardRoute.post('/create',createCard)
cardRoute.get('/get/:id',getCard)
cardRoute.delete('/delete/:id',deleteCard)