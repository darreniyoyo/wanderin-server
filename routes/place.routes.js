// routes/place.routes.js

const router = require("express").Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require("./middleware/jwt.middleware");


const Place = require('../models/Place.model');
const Trip = require('../models/Trip.model');

//  POST /api/places  -  Creates a new place
router.post('/places', isAuthenticated, (req, res, next) => {
  const { title, description } = req.body;

  Place.create({ title, description })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;
