const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{ 
    const token = req.headers.authorization?.split(" ")[1] 
    if (!token) {
        return res.status(401).json({ error: "No token provided" })
    }
    
    try {
        const decoded = jwt.verify(token, "SECRET_KEY")
        req.userId = decoded.userId
        next()
    }catch (err) {
        res.status(401).json({ error: "Invalid token" })
    }
}

module.exports = auth