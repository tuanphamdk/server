const authController = require("../controllers/authController")

const authRoute = (app) => {
    app.post("/api/auth/register", authController.register)
    app.post("/api/auth/login", authController.login)
}

module.exports = authRoute