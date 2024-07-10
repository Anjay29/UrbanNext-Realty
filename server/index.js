import express from "express"
import { mongoose } from "mongoose"
import cookieParser from "cookie-parser"
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 3000

dotenv.config()

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Other middleware
app.use(express.json())
app.use(cookieParser())

// Your routes
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import listingRoute from "./routes/listingRoute.js"

app.use('/api/v1', userRoute)
app.use('/api/v1', authRoute)
app.use('/api/v1', listingRoute)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Server is running on ${port}`);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch((err) => {
    console.log(err);
});