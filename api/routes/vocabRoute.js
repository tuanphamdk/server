const vocabController = require("../controllers/vocabController")
const auth = require("../Middleware/authMiddleware")

const vocabRoute = (app) => {
    app.get("/api/vocabs/test-vocab", auth, vocabController.testByMode);
    app.get("/api/vocabs/test-mcq", auth, vocabController.testMultipleChoice);

    app.route('/api/vocabs')
        .get(auth, vocabController.viewAllVocabs)
        .post(auth, vocabController.createNewVocab)
        .delete(auth, vocabController.deleteAllVocab)


    app.route('/api/vocabs/:id')
        .get(auth, vocabController.getAllVocabById)
        .put(auth, vocabController.updateVocab)
        .delete(auth, vocabController.deleteVocabById)
}
module.exports = vocabRoute