// Cars Routes

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/cars', carController.getCars);

router.post('/cars', carController.createCar);

router.put('/cars', carController.updateCar);

router.delete('/cars', carController.deleteCar);

module.exports = router;
