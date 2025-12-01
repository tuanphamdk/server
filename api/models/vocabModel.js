const mongoose = require('mongoose')
const vocabSchema = mongoose.Schema({
    english:{
        type: String,
        required:[true, "English word is compulsory"],
        minlength:[3,"Minimum letters is 3"],
        maxlength:[30,"Maximum letter is 30"],
        unique:true
    },

    german:{
        type: String,
        required:[true, "English word is compulsory"],
        minlength:[3,"Minimum letters is 3"],
        maxlength:[30,"Maximum letter is 30"],
        unique:true
    },

        vietnamese: {
        type: String,
        required:[true, "Vietnamese word is compulsory"],
        minlength:[1,"Minimum letters is 1"],
        maxlength:[50,"Maximum letter is 50"],
    },

    owner :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }
}, {timestamps: true})

const vocabModel = mongoose.model('vocabs', vocabSchema)
module.exports=vocabModel