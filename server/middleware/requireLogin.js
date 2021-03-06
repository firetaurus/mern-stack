const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const {
    JWT_SECRET
} = require('../keys')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Not authorized" })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Not authorized" });
        }
        const { id } = payload;
        User.findById(id).then((userData) => {
            req.user = userData
            next()
        })
    })
}