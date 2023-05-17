import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/services.js'
import taskRoute from './routes/tasks.js'
import commentRoute from './routes/comments.js'
import chatRoute from './routes/chat.js'
import messagesRoute from './routes/messages.js'
import reviewsRoutes from './routes/reviews.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/comments', commentRoute)
app.use('/api/chat', chatRoute)
app.use('/api/messages', messagesRoute)
app.use('/api/reviews', reviewsRoutes)
// app.get('/',(req,res)=>{
//     return res.json({message:'All is fine'})
// })

async function start() {
    try {
        await mongoose.connect(
            
             `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p3elhhy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
            //`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p3elhhy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        )

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
