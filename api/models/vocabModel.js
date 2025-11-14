// import mongoose
const mongoose = require('mongoose')
// declare schema (table structured/design - what's inside table)
const vocabSchema = mongoose.Schema({
    // declare column/fields & datatype
    // option 1: short code but no validation
    // english : String,
    // german : String
    // option 2: longer code but support validation
    english: {
        type: String,
        required: [true, "English word is compulsory"],
        minlength: [3, "Minimum letters is 3"],
        maxlength: [30, "Maximum letters is 30"],
        unique: true // no duplicated word
    },
    german: {
        type: String,
        required: [true, "German word is compulsory"],
        minlength: [3, "Minimum letters is 3"],
        maxlength: [30, "Maximum letters is 30"],
        unique: true // no duplicated word
    },
    //     vietnamese: {
    //     type: String,
    //     required: [true, "Vietnamese word is compulsory"],
    //     minlength: [3, "Minimum letters is 3"],
    //     maxlength: [30, "Maximum letters is 30"],
    //     unique: true // no duplicated word
    // }
})  

// declare model
const vocabModel = mongoose.model('vocabbs', vocabSchema)
// nerver forget to export model
module.exports = vocabModel