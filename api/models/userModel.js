const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true, // ko dc empty
        unique: true, //ko trung lap
        minlength: 4
    },

    email:{
        type:String,
        required: true,
        unique:true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
})


const userModel = mongoose.model('User', userSchema)
module.exports = userModel