const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    recipeName: String,
    description: String,
    images: [String],
    postedBy: { name: String, image: String, date: String },
    vedioUrl: String,
    serves: String,
    prepTime: String,
    cookTime: String,

    ingredients: [
        {
            name: String,
            quantity: String,
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);
