import { Router } from "express";
import { middleware } from "../middleware/middleware";
import { createBoard, deleteBoard, getBoard } from "../controllers/boardController";

export const boardRoute = Router()

boardRoute.post('/create',middleware,createBoard)
boardRoute.get('/get',middleware,getBoard)
boardRoute.delete('/delete/:id',middleware,deleteBoard)