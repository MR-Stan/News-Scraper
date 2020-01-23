// Dependencies
// ----------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');

// ----------------------------------------------------

// Setting the port
const PORT = process.env.PORT || 3000;

// Initialize express
const app = express();

// Routes
// ----------------------------------------------------
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
// ----------------------------------------------------

// Middleware
// ----------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// ----------------------------------------------------

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });



app.listen(PORT, function () {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
    );
});

module.exports = app;

