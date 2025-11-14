// import model
const { model } = require('mongoose')
const vocabModel = require('../models/vocabModel')

// implement API(business logic)
const viewAllVocabs = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const vocabs = await vocabModel.find({})
        res.status(200).json(vocabs)
    } catch (err){
        console.error(err)
    }
}
const createNewVocab = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const vocabs = await vocabModel.create(req.body)
        res.status(200).json(vocabs)
    } catch (err){
        console.error(err)
    }
}
const deleteAllVocab = async(req, res) =>{
    try{
        //get vocab data and save to an array
        await vocabModel.deleteMany()
        res.json({"message":"delete all vocab succeed!"})

    } catch (err){
        console.error(err)
    }
}

const getAllVocabById = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const id = req.params.id
        const vocab = await vocabModel.findById(id)
        res.status(200).json(vocab)

    } catch (err){
        console.error(err)
    }
}
const updateVocab = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const id = req.params.id
        const body = req.body
        await vocabModel.findByIdAndUpdate(id,body, { new: true })
        res.json({"message":"update vocab successful"})

    } catch (err){
        console.error(err)
    }
}
const deleteVocabById = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const id = req.params.id
        await vocabModel.findByIdAndDelete(id)
        res.json({"message":"delete vocab successful"})

    } catch (err){
        console.error(err)
    }
}
const searchVocabByName = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const keyword = req.params.keyword
        const vocab = await vocabModel.find([
            {english : new RegExp(keyword, "i")},
            {german : new RegExp(keyword, "i")}
        ]
        )
        res.status(200).json(vocab)

    } catch (err){
        console.error(err)
    }
}
const sortVocabAsc = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const vocab = await vocabModel.find().sort({_id : 1});
        res.status(200).json(vocab)
    } catch (err){
        console.error(err)
    }
}
const sortVocabDesc = async(req, res) =>{
    try{
        //get vocab data and save to an array
        const vocab = await vocabModel.find().sort({german : -1});
        res.status(200).json(vocab)
    } catch (err){
        console.error(err)
    }
}
// export API at last 
module.exports = {
    viewAllVocabs,
    createNewVocab,
    deleteAllVocab,
    getAllVocabById,
    updateVocab,
    deleteVocabById,
    searchVocabByName,
    sortVocabAsc,
    sortVocabDesc
}