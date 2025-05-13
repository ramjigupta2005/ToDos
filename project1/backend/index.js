const express = require('express')
// const mongoose=require('mongoose')
const app = express()
const cors=require('cors')
const { userRouter } = require("./routes/user")
const { todoRouter } = require("./routes/todo")
const { mongoose } = require('mongoose')
const { mongoUrl } = require('./config')
const dotenv = require('dotenv')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/todo', todoRouter)
mongoose.connect(mongoUrl).then(()=>{
    console.log("Database connected successfully")
}).catch((e)=>{
console.log(`Error occured ${e}`);
})
// app.listen(3000)

app.listen(3000, ()=>{
    console.log("The server is running on port 3000")
})