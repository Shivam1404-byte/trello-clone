import { Router } from "express";
import { createCard } from "../controllers/cardController";


export const cardRoute = Router()

cardRoute.post('/create',createCard)