const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
const user = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String
})
const todo = new Schema({
    title: { type: String, require: true },
    description: String,
    date:String,
    status:String,
    userId: ObjectId,
    uId:String
})
const userModel = mongoose.model('users', user)
const todoModel = mongoose.model('todos', todo)

module.exports = {
    userModel, todoModel
}