const{model} = require('mongoose')
const vocabModel = require('../models/vocabModel')
const mongoose = require('mongoose')

const viewAllVocabs = async(req,res) => {
    try{
        const vocabs = await vocabModel.find({owner:req.userId})
        res.status(200).json(vocabs)
    } catch(err){
        console.error(err)
    }
}

const createNewVocab = async(req,res) =>{
    try{
        const vocabs = await vocabModel.create({...req.body, owner:req.userId}) // ... de cho ca owner vao req.body
        res.status(200).json(vocabs)
    } catch(err){
        console.error(err)
    }
}
// dùng const để lưu kq khai báo biến
const deleteAllVocab = async(req,res) =>{
    try{
        await vocabModel.deleteMany()
        res.json({"message":"delete all vocab successful"})
    } catch (err){
        console.error(err)
    }
}

const deleteVocabById = async(req,res) => {
    try{
        await vocabModel.findByIdAndDelete(req.params.id)
        res.json({"message":"delete vocab successful"})
    }catch (err){
        console.error(err)
    }
}

const getAllVocabById = async(req,res) =>{
    try{
    const vocabs = await vocabModel.findById(req.params.id)
    res.status(200).json(vocabs)
    }catch (err){
        console.error(err)
    }
}

const updateVocab = async(req,res) => {
    try{
    await vocabModel.findByIdAndUpdate(req.params.id,req.body, {new:true})
    res.json({"message":"update vocab successful"})
    }catch(err){
            console.error(err)
    }
}

const testByMode = async(req,res) => {
    try{
        const mode = req.query.mode || "english-to-german";
        const limit = Number(req.query.limit) || 5;

        const allVocabs = await vocabModel.find({
            owner:req.userId
        });

        if (allVocabs.length === 0) {
            return res.status(400).json({ error: "You don't have any vocabulary yet." });
        }

        const realLimit = Math.min(limit, allVocabs.length);
        const selected = allVocabs
            .sort(() => Math.random() - 0.5)
            .slice(0, realLimit);

        const result = selected.map(v => {
            
            if (mode === "german-to-english") {
                return { id: v._id, question: v.german, answer: v.english };
            }

            if (mode === "english-to-german") {
                return { id: v._id, question: v.english, answer: v.german };
            }


            if (mode === "english-to-vietnamese") {
                return { id: v._id, question: v.english, answer: v.vietnamese };
            }

            if (mode === "vietnamese-to-english") {
                return { id: v._id, question: v.vietnamese, answer: v.english };
            }

            if (mode === "vietnamese-to-german") {
                return { id: v._id, question: v.vietnamese, answer: v.german };
            }
            if (mode === "german-to-vietnamese") {
                return { id: v._id, question: v.german, answer: v.vietnamese };
            }


            return { id: v._id, question: v.english, answer: v.german };
        });

        res.json({
            requested: limit,
            returned: result.length,
            mode,
            vocabs: result
        })

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"})
    }
}


module.exports = {
    viewAllVocabs,
    createNewVocab,
    deleteAllVocab,
    getAllVocabById,
    updateVocab,
    deleteVocabById,
    testByMode
}