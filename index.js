const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Connect to MLab DB
mongoose.connect(keys.mongoURI);

// Execute mongoose to set up User model before executing passport.js which has data from Mongoose
require('./models/User');

// Execute mongoose to set up Survey Model
require('./models/Survey');

// Execute passport.js to configure Passport.js
require('./services/passport');

// Define the app object
const app = express();

// Body Parser middleware
app.use(bodyParser.json());

// Use cookies for Passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Pass the app object as a parameter to configure authentication routes
 * 
 * TODO: Refactor to use express.Router
 */
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// // Application Route Handlers
// app.get('/', (req, res) => {
//   res.send({ Hello: 'World'});
// });

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets
  app.use(express.static('client/build'));

  //Express will serve index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
