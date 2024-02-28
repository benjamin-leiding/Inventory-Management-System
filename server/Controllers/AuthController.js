const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        let { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        password = await bcrypt.hash(password, 12);

        const allUsers = await User.find()
        console.log(allUsers)
        if(allUsers.length == 0){
            const role = 2
            const user = await User.create({ email, password, username, createdAt, role});
            const token = createSecretToken(user._id);
            return res
                .status(201)
                .json({ message: username + " registered and logged in as prof", success: true, token : token, user : user });

        }else{
            const user = await User.create({ email, password, username, createdAt});
            const token = createSecretToken(user._id);
            return res
                .status(201)
                .json({ message: username + " registered and logged in as student", success: true, token : token, user : user });
        }


        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ){
            return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.json({message:'Incorrect email' })
        }
        console.log("debugging les go")
        console.log(user)
        console.log(password)
        let pass = await bcrypt.hash(password, 12);
        console.log(pass)

        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
            console.log("auth failed for " + user.email)
            return res.json({message:'Incorrect password' })
        }else{
            console.log("auth succeded for " + user.email)
        }
        console.log(user)
        const token = createSecretToken(user._id);

        res.status(201).json({ message: "User logged in successfully", success: true, token : token, user : user });
        next()
    } catch (error) {
        console.error(error);
    }
}