const User =  require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res) => {
    const {username, email, password} = req.body
    
    
      // Kiểm tra cơ bản trước khi hash
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields." });
  }
  if (username.length < 4) {
    return res.status(400).json({ error: "Username must be at least 4 characters." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
    try{
        const hashed = await bcrypt.hash(password,10) // 10 la salt round, cang cao cang khoe
    
        const newUser = await User.create({
            username,
            email,
            password: hashed
        })
        res.status(201).json({message: "Register successfully"})
    } catch(err){
        console.error(err);

        if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // username hoặc email
      return res.status(400).json({ error: `${field} already exists.` });
    }
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