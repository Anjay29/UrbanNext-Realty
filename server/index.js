import express from "express"
import { mongoose } from "mongoose"
const app = express()
const port = process.env.PORT || 3000
import cookieParser from "cookie-parser"
import cors from 'cors'

// import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use(cookieParser())

// app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
//   }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });  

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200
}
// app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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
import listingRoute from "./routes/listingRoute.js"
app.use('/api/v1',userRoute)
app.use('/api/v1',authRoute)
app.use('/api/v1', listingRoute)
