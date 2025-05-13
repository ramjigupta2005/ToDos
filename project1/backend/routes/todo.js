const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors=require('cors')
const { todoModelModel } = require("../db")
const jwt = require('jsonwebtoken')
const { secret } = require("../config")
const { Router }=require('express')
const todoRouter=Router()
// todoRouter.post('/')




module.exports={
    todoRouter
}