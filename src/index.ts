
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './framework/routes/authRoutes.js'
import ConnectDB from './framework/database/connectDB.js'
import { errorHandler } from './adapters/middleware/error.handler.js'
import cors from 'cors'
import tripRoutes from './framework/routes/tripRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
app.use(cookieParser())

// hi
app.use(cors({
  origin: ['http://localhost:5173', 'https://go-tracktask.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
const db = new ConnectDB()

app.use(express.json())
db.connect()

app.use('/api/auth',authRoutes)
app.use('/api/trip',tripRoutes)

app.use(errorHandler)

app.listen(7000,()=>{
    console.log('server running on port 7000');
    
})






