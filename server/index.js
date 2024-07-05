import express from "express"
import { mongoose } from "mongoose"
const app = express()
const port = process.env.PORT || 3000
import cookieParser from "cookie-parser"
import cors from 'cors'
// import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Server is running on ${port}`);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch((err) => {
    console.log(err);
});


import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
app.use('/api/v1',userRoute)
app.use('/api/v1',authRoute)
