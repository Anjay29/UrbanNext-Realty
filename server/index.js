import express from "express"
import { mongoose } from "mongoose"
const app = express()
const port = process.env.PORT || 3000
// import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Server is running on ${port}`);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
  res.send('Hello World!!')
})
