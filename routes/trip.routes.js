const router = require("express").Router();

const mongoose = require('mongoose');


const Trip = require('../models/Trip.model');



//READ list of trips 
router.get('/trips', (req, res, next) => {
    Trip.find()
        .then(allTrips => {
            res.json(allTrips)
        })
        .catch(err => res.json(err));
});


//CREATE new trip
router.post('/trips', (req, res, next) => {
    const { title, description, days, location } = req.body;

    Trip.create({ title, description, days : Number(days), location})
        .then(response => res.json(response))
        .catch(err => res.json(err));
});



//READ trip details
router.get('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;

    //validate tripId
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }


    Trip.findById(tripId)
        .then(trip => res.json(trip))
        .catch(error => res.json(error));
});



//UPDATE trip
router.put('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Trip.findByIdAndUpdate(tripId, req.body, { returnDocument: 'after' })
        .then((updatedTrip) => res.json(updatedTrip))
        .catch(error => res.json(error));
});



//DELETE trip
router.delete('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Trip.findByIdAndRemove(tripId)
        .then(() => res.json({ message: `Trip with id ${tripId} removed successfully.` }))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
