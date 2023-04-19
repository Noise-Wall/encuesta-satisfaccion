require('dotenv').config()
const jwt = require("jsonwebtoken")

function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKENSECRET, {expiresIn: '15m'})
}

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split(" ")[1]
    if (token == null) return res.status(401).json({"message":"Acceso restringido"})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({"message": "Acceso prohibido"})
        }
        req.user = user

        next()
    })
}

module.exports = {generateAccessToken, authenticateToken};