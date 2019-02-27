const mongoose = require('mongoose');
const Recipe = require('./recipe-model')

const categorySchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    description: String,
    images: String,

    recipeId : [{ type: mongoose.Schema.Types.ObjectId, ref: Recipe}]
});

module.exports = mongoose.model('Category', categorySchema);
