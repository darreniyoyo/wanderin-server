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

module.exports = router;
