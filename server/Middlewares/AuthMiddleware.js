const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.headers.token
    if (!token) {

        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {

            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user })
            else return res.json({ status: false })
        }
    })
}

module.exports.MinRole1 = async (req, res, next) => {
    jwt.verify(req.headers.token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {

            return res.json({ status: false })
        } else {

            const user = await User.findById(data.id)
            if (user.role >= 1){

                next()
            }else {
                return res.json({message: "User not authorized for this action"})
            }
        }
    })
}

module.exports.MinRole2 = async (req, res, next) => {
    jwt.verify(req.headers.token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {

            return res.json({ status: false })
        } else {

            const user = await User.findById(data.id)
            if (user.role >= 2){
                next()
            }else {
                return res.json({message: "User not authorized for this action"})
            }
        }
    })
}