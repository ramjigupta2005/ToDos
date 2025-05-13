const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const { userModel, todoModel } = require("../db")
const jwt = require('jsonwebtoken')
const { secret } = require("../config")
const { Router } = require('express')
const userRouter = Router()
const { authMiddleware } = require("../middlewares/user")

userRouter.post('/signup', async function (req, res) {
    const { email, password, name } = req.body
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await userModel.create({
        email: email,
        password: hashPassword,
        name: name
    })
    res.json({
        message: "You have signed up"
    })
})
userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body
    const response = await userModel.findOne({
        email: email
    })

    if (!response) {
        res.json({
            message: "User not found"
        })
        return
    }
    const passwordMatch = await bcrypt.compare(password, response.password)
    try {
        if (passwordMatch) {
            const token = jwt.sign({ id: response._id }, secret)
            res.json({
                message: "You are signed in",
                token: token
            })
        } else {
            res.json({
                message: "Invalid credentials"
            })
        }
    } catch (e) {
        res.json({
            message: "error occured"
        })
    }

})
userRouter.get('/', authMiddleware, async function (req, res) {
    const userId = req.userId
    const data = await userModel.findOne({ _id: userId })

    res.json({
        data: data
    })

})

userRouter.post('/todos', authMiddleware, async function (req, res) {
    const userId = req.userId
    const { title, description, date, status, uId } = req.body
    const todo = await todoModel.create({
        title: title,
        description: description,
        date: date,
        status: status,
        userId: userId,
        uId: uId
    })
    res.json({
        message: "Todo created",
        todo: todo
    })
})
userRouter.put('/todos', authMiddleware, async function (req, res) {
    const userId = req.userId
    const { title, description, date, status } = req.body
    const uId=req.headers
    console.log(uId);
    
    const todo = await todoModel.updateOne({ userId: userId, uId: uId }, {
        title: title,
        description: description,
        datwe: date,
        status: status
    })
    res.json({
        message: "Todo updated",
        todo: todo
    })
})
userRouter.get('/todos', authMiddleware, async function (req, res) {
    const userId = req.userId
    const todo = await todoModel.find({ userId: userId })
    res.json({
        message: "All todos",
        todo: todo
    })
})
userRouter.delete('/todos', authMiddleware, async function (req, res) {
    const userId = req.userId
    // console.log("deleting todo");
    
    const uId=req.headers.uid;
    // console.log(uId);
    
    // const { uId } = req.body
    // console.log(uId)
    // const { title } = req.body
    const deleteTodo = await todoModel.deleteOne({ userId: userId, uId: uId },
        // {
        //     title: title
        // }
    )

    res.json({
        message: "Todo deleted",
        deleteTodo: deleteTodo
    })
})
module.exports = {
    userRouter
}