// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const authRoutes = require('./routes/auth.routes');     // <== IMPORT
app.use('/api', authRoutes);   

const tripRouter = require('./routes/trip.routes');     // <== IMPORT
app.use('/api', isAuthenticated, tripRouter);                               // <== ADD

const placeRouter = require('./routes/place.routes');    // <== IMPORT
app.use('/api', isAuthenticated, placeRouter);        




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
