// Dependencies
// ----------------------------------------------------
const express = require('express');


// ----------------------------------------------------

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

// Setting the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
    );
});

module.exports = app;

