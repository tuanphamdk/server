// Express framework
// import express server library
const express = require('express')
// declare an express instance (web app)
const app = express()

//mongoose (db)
//import mongoose library
const mongoose = require('mongoose')
// declare database connection string (URL)
// const database_url = "mongodb://localhost:27017/vocab_builder"
const cloud_db = "mongodb+srv://tuanphamdk504:vinh2k30@mydbcluster.fakucer.mongodb.net/"
// connect to db
mongoose.connect(cloud_db)
//connect succeed
.then(()=>console.log('Connect to DB succeed'))
// connect failed
.catch((err)=>console.error('Connect to DB failed!' + err))

// config parser input
app.use(express.json())

// cors (very important: without cors, frontend cannot call API)
// import cors library
const cors = require('cors')
//option 1: enable CORS for all client (public : short but unsecured)
// app.user(cors())
// option 2: enable CORS for specific client (private - longer code but more secured)
const corsOption = {
    // A: only 1 origin (URL)
    origin: "http://localhost:8080", // allow on this origin
    // B: many origins
    // origin: ["http://localhost:8080, https://vocab-client.com"]
    optionSuccessStatus: 200 // for legacy browser supper
}
app.use(cors(corsOption));
// route (router)
//import route
const router =  require('./api/routes/vocabRoute')
//register route
router(app)

// start server
// declare server port
const port = 3000
// listen to port to start server
app.listen(port, ()=>{
    console.log('Server is running http/localhost:' + port)
})