import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

export const authRoute = Router()

authRoute.post('/signUp',signUp)
authRoute.post('/signIn',signIn)