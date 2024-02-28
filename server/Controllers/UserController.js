const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.GetUser = async (req, res, next) => {
    try {
        const { id } = req.body;

        const user = await User.findOne({ id });
        if (existingUser) {
            return res.json({ user: user });
        }
        else{
            return res.json({message: "User not found"})
        }
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.GetUsers = async (req, res, next) => {
    try {

        const users = await User.find();
        if (users) {

            return res.json({ users: users });
        }
        else{
            return res.json({message: "Users not found"})
        }
        next();
    } catch (error) {
        console.error(error);
    }

};

module.exports.PromoteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.promotionId);
        if (user) {
            console.log(user)
            if(user.role < 2){
                user.role = user.role + 1
            }

            await user.save()

            return res.json({ user: user });
        }
        else{
            return res.json({message: "Users not found"})
        }
        next();
    } catch (error) {
        console.error(error);
    }
};



