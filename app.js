const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes =  require('./api/routes/recipe-routes');
const categoryRoutes = require('./api/routes/category-routes');
const orderRoutes =  require('./api/routes/orders');

mongoose.connect('mongodb://inhyi0185.intl.att.com:27017/recipes-mongodb' ,
        {
            // useMongoClient: true
            useNewUrlParser: true
        }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/*
app.use((req, res, next) => {
    res.status(200).json( {
        message: 'It works!'
    })
});
*/

app.use('/recipes', recipeRoutes);
app.use('/category', categoryRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;