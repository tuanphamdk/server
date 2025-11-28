const User =  require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res) => {
    const {username, email, password} = req.body
    try{
        const hashed = await bcrypt.hash(password,10) // 10 la salt round, cang cao cang khoe
    
        const newUser = await User.create({
            username,
            email,
            password: hashed
        })
        res.status(201).json({message: "Register successfully"})
    } catch(err){
        console.error(err)
    }
}

const login = async(req,res) => {
    const{email,password} = req.body
    try{
        const user = await User.findOne({email}) //tim user theo email
        if(!user){
            return res.status(400).json({error:"User not found"})
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match) {
            return res.status(400).json({error: "Wrong Password"})
        }

        const token = jwt.sign({
            userId:user._id,
            username:user.username,
            email:user.email
        },
        "SECRET_KEY", {expiresIn:"1d"});
        res.json({token})
    } catch(err){
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    register,
    login
}