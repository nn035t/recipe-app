const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handeling GET request to /orders'
    })
});

router.post('/',(req, res, next) => {
    res.status(201).json({
        message: 'Handeling POST request to /orders'
    })
});

router.get('/:orderId',(req, res, next) => {
    res.status(200).json({
        message: 'You have the orders with ID!',
        orderId : req.params.orderId
    }) 
});

router.patch('/:orderId',(req, res, next) => {
    res.status(200).json({
        message: 'You have the updated the orders with ID!',
        orderId : req.params.orderId
    }) 
});

router.delete('/:ordersId',(req, res, next) => {
    const id = req.params.ordersId;
    res.status(200).json({
        message: 'You have the deleted the orders with ID!',
        orderId : req.params.orderId
    }) 
});


module.exports = router;