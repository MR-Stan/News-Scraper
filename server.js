// Dependencies
// ----------------------------------------------------
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
// ----------------------------------------------------

// Setting the port
const PORT = process.env.PORT || 3000;

// Initialize express
const app = express();

// Middleware
// ----------------------------------------------------
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// ----------------------------------------------------

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
// drop database
// mongoose.connect("mongodb://localhost/unit18Populater", function () {
//     mongoose.connection.db.dropDatabase();
// });
// ----------------------------------------------------
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
// ----------------------------------------------------

app.listen(PORT, function () {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
    );
});

module.exports = app;

