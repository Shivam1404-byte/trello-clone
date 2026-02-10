import express from "express"
import { authRoute } from "./routes/authRoutes"
import { boardRoute } from "./routes/boardRoute"
import { listRoute } from "./routes/listRoute"
import { cardRoute } from "./routes/cardRoute"
import cors from "cors"
import {config} from "dotenv"
config()


export const app = express()

app.use(express.json())

app.use(cors({
    origin:process.env.URL,
    methods:["POST","GET","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use('/auth',authRoute)
app.use('/board',boardRoute)
app.use('/list',listRoute)
app.use('/card',cardRoute)

app.get('/',(req,res)=>{
    res.status(200).json({Message:"App is running"})
})