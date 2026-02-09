import { Router } from "express";
import { createListItem, deleteListItem, getListItem } from "../controllers/listController";

export const listRoute = Router()

listRoute.post('/create',createListItem)
listRoute.get('/get',getListItem)
listRoute.delete('/delete/:id',deleteListItem)