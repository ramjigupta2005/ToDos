require('dotenv').config()

const secret=process.env.JWT_SECRET
const mongoUrl=process.env.MONGO_URL

module.exports={
    secret, mongoUrl
}