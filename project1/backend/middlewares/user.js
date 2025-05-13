const jwt = require('jsonwebtoken')
const { secret } = require("../config")

function authMiddleware(req, res, next) {
    const token = req.headers.token
    const decode = jwt.verify(token, secret)
    // console.log(decode);

    if (decode) {
        req.userId = decode.id
        
        next()
    } else {
        res.json({
            message: "Invalid cerdentials"
        })
    }

}
module.exports = {
    authMiddleware
}