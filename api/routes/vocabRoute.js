// import controller
const vocabController = require("../controllers/vocabController")
// declare the router(route)
const vocabRoute = (app) =>{
    // declare API endpoint + method
    //group 1: all API without ID
    app.route('/api/vocabs')
        .get(vocabController.viewAllVocabs)
        .post(vocabController.createNewVocab)
        .delete(vocabController.deleteAllVocab)

    // //group 2: all API with ID
    app.route('/api/vocabs/:id')
        .get(vocabController.getAllVocabById)
        .put(vocabController.updateVocab)
        .delete(vocabController.deleteVocabById)

    app.route('/api/vocabs/search:keyword')
        .get(vocabController.searchVocabByName)

    app.route('/api/vocabs/sort/sortAsc')
        .get(vocabController.sortVocabAsc)

    app.route('/api/vocabs/sort/sortDesc')
        .get(vocabController.sortVocabDesc)
}
// export router
module.exports = vocabRoute
