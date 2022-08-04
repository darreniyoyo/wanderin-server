// routes/trip.routes.js

const router = require("express").Router();

const mongoose = require('mongoose');

const Trip = require('../models/Trip.model');
const Place = require('../models/Place.model');

//  POST /api/trips  -  Creates a new trip
router.post('/trips', (req, res, next) => {
  const { title, description } = req.body;

  Trip.create({ title, description, place: [] })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


// GET /api/trips -  Retrieves all of the trips
router.get('/trips', (req, res, next) => {
    Trip.find()
      .populate('places')
      .then(allTrips => res.json(allTrips))
      .catch(err => res.json(err));
  });
  

//  GET /api/trips/:tripId -  Retrieves a specific trip by id
router.get('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // Each trip document has `places` array holding `_id`s of place documents
    // We use .populate() method to get swap the `_id`s for the actual place documents
    Trip.findById(tripId)
      .populate('places')
      .then(trip => res.status(200).json(trip))
      .catch(error => res.json(error));
  });
  
  
  // PUT  /api/trips/:tripId  -  Updates a specific trip by id
  router.put('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Trip.findByIdAndUpdate(tripId, req.body, { new: true })
      .then((updatedTrip) => res.json(updatedTrip))
      .catch(error => res.json(error));
  });
  
  
  // DELETE  /api/trips/:tripId  -  Deletes a specific trip by id
  router.delete('/trips/:tripId', (req, res, next) => {
    const { tripId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Trip.findByIdAndRemove(tripId)
      .then(() => res.json({ message: `trip with ${tripId} is removed successfully.` }))
      .catch(error => res.json(error));
  });
  
  
  // ...
  
  




module.exports = router;
