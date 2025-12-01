// Express framework
const express = require('express')
const app = express()

// Mongoose
const mongoose = require('mongoose')

// OPTION A: LOCAL MONGO
// mongoose.connect("mongodb://localhost:27017/test_vocab")

// // OPTION B: CLOUD MONGO (Atlas)
mongoose.connect("mongodb+srv://tuanphamdk504:vinh2k30@mydbcluster.fakucer.mongodb.net/test_vocab")

mongoose.connection.once("open", () => console.log("DB connected"))
mongoose.connection.on("error", err => console.error("DB error:", err))

// Middleware
app.use(express.json())

// CORS
const cors = require("cors")
app.use(cors())

// Routes
const vocabRoute = require("./api/routes/vocabRoute")
const authRoute = require("./api/routes/authRoute")
authRoute(app)
vocabRoute(app)

// Start server
const port = 3000
app.listen(port, () => {
    console.log("Server running at http://localhost:" + port)
})
