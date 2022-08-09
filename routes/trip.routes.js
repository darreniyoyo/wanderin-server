const router = require("express").Router();

const mongoose = require('mongoose');

const {isAuthenticated} = require("../middleware/jwt.middleware")

const Trip = require('../models/Trip.model');
const Place = require('../models/Place.model');



//READ list of trips 
router.get('/trips', isAuthenticated, (req, res, next) => {
    Trip.find()
        .populate("places")
        .then(allTrips => {
            res.json(allTrips)
        })
        .catch(err => res.json(err));
});


//CREATE new trip
router.post('/trips', isAuthenticated, (req, res, next) => {
    const { title, description } = req.body;

    Trip.create({ title, description, places: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});



//READ trip details
router.get('/trips/:tripId', isAuthenticated, (req, res, next) => {
    const { tripId } = req.params;

    //validate tripId
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each Trip document has `places` array holding `_id`s of Place documents
    // We use .populate() method to get swap the `_id`s for the actual Place documents
    Trip.findById(tripId)
        .populate('places')
        .then(trip => res.json(trip))
        .catch(error => res.json(error));
});



//UPDATE trip
router.put('/trips/:tripId', isAuthenticated, (req, res, next) => {
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
router.delete('/trips/:tripId', isAuthenticated, (req, res, next) => {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Trip.findByIdAndRemove(tripId)
        .then(deteletedTrip => {
            return Place.deleteMany({ _id: { $in: deteletedTrip.places } });
        })
        .then(() => res.json({ message: `Trip with id ${tripId} & all associated places were removed successfully.` }))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
