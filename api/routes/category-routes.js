const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Category = require('../models/recipe-category');


router.post("/", (req, res, next) => {
    console.log("Req: ", req.body)
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName: req.body.categoryName,
        description: req.body.description,
        images: req.body.images,
        recipeId: req.body.recipeId
    });
    category.save().
    then(result => {
        console.log("The category is",result);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'Unable to create the category.' });
        }
    }).
    catch(error => {
        // console.log("Trouble in finding recipe");
        console.log(error)
        res.status(500).json({ error: error });
    });
});


module.exports = router;