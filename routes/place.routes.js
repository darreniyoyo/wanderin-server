const router = require("express").Router();

const mongoose = require('mongoose');


const Place = require('../models/Place.model');
const Trip = require('../models/Trip.model');



//READ list of places 
router.get('/places', (req, res, next) => {
    Place.find()
        .then(allPlaces => {
            console.log(allPlaces)
            res.json(allPlaces)
        })
        .catch(err => res.json(err));
});


//CREATE new place
router.post('/places', (req, res, next) => {
    const { title, description } = req.body;

    Place.create({ title, description })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});



//READ place details
router.get('/places/:placeId', (req, res, next) => {
    const { placeId } = req.params;

    //validate placeId
    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each Place document has `trip` array holding `_id`s of Place documents
    // We use .populate() method to get swap the `_id`s for the actual Place documents
    Place.findById(placeId)
        .then(place => res.json(place))
        .catch(error => res.json(error));
});



//UPDATE place
router.put('/places/:placeId', (req, res, next) => {
    const { placeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Place.findByIdAndUpdate(placeId, req.body, { returnDocument: 'after' })
        .then((updatedPlace) => res.json(updatedPlace))
        .catch(error => res.json(error));
});



//DELETE place
router.delete('/places/:placeId', (req, res, next) => {
    const { placeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Place.findByIdAndRemove(placeId)
        .then(deteletedPlace => {
            return Place.deleteMany({ _id: { $in: deteletedPlace.trips } });
        })
        .then(() => res.json({ message: `Place with id ${placeId} & all associated trips were removed successfully.` }))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
