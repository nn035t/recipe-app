const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Recipe = require('../models/recipe-model');

router.get('/', (req, res, next) => {
    Recipe.find().exec().
        then(result => {
            if (result.length >= 0) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ message: 'No Recipies in DB' });
            }
        }).catch(error => {
            // console.log("Trouble in finding recipe");
            res.status(500).json({ error: error });
        });

});

router.post('/', (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        recipeName: req.body.recipeName,
        description: req.body.description,
        images: req.body.images,
        postedBy: req.body.postedBy,
        vedioUrl:req.body.vedioUrl,
        serves: req.body.serves,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        ingredients: req.body.ingredients
    });
    recipe.save().
    then(result => {
        // console.log("The Recide is",result);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'Unable to create the recipe.' });
        }
    }).
    catch(error => {
        // console.log("Trouble in finding recipe");
        res.status(500).json({ error: error });
    });
});

router.post('/', (req, res, next) => {
    const recipe = new category({
        _id: new mongoose.Types.ObjectId(),
        recipeName: req.body.recipeName,
        description: req.body.description,
    });
    recipe.save().
    then(result => {
        // console.log("The Recide is",result);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'Unable to create the recipe.' });
        }
    }).
    catch(error => {
        // console.log("Trouble in finding recipe");
        res.status(500).json({ error: error });
    });
});

router.get('/:_id', (req, res, next) => {
    const id = req.params._id;
    Recipe.findById(id).
        exec().
        then(result => {
            // console.log("The Recide is",result);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ message: 'No valid entry found for provided id' });
            }
        }).
        catch(error => {
            // console.log("Trouble in finding recipe");
            res.status(500).json({ error: error });
        });
});

router.patch('/:_id', (req, res, next) => {
    const id = req.params._id;;
    const updateRecipe = {};
    for (const ops of req.body) {
        updateRecipe[ops.propName] = ops.value;
    }
    Recipe.update({ _id : id }, { $set: { recipeName: req.body.newrecipeName, description: req.body.newDescription}}).
    then(result => {
        // console.log("The Recide is",result);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'Unable to update for provided id' });
        }
    }).
    catch(error => {
        // console.log("Trouble in finding recipe");
        res.status(500).json({ error: error });
    });
});


router.delete('/:_id', (req, res, next) => {
    const id = req.params._id;;
    Recipe.remove({ _id: id }).exec().
        then(result => {
            // console.log("The Recide is",result);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ message: 'Unable to delete for provided id' });
            }
        }).
        catch(error => {
            // console.log("Trouble in finding recipe");
            res.status(500).json({ error: error });
        });
});


module.exports = router;