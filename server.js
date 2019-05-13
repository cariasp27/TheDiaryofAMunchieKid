//////////////////// SERVER SETUP /////////////////////////////////
  var express     = require('express');
  var app         = express();
  var passport    = require('passport');
  var session     = require('express-session');
  var bodyParser  = require('body-parser');
  var env         = require('dotenv').config();
  var exphbs      = require('express-handlebars');
  var PORT        = process.env.PORT || 3000;

// Parse application body as JSON
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
// Serve static content for the app from "/public" 
  app.use(express.static("public"));

////////// PASSPORT & SESSION SETUP //////////////////////////////////////////
  app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  

  // Models
  var models = require("./models");
  //Routes
  var authRoute = require('./routes/auth.js')(app, passport);
  // Strategies
  require('./config/passport/passport.js')(passport, models.user);

  // If running a test, set syncOptions.force to true
  // clearing the `testdb`
  var syncOptions = { force: false };
  if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
  }

/////////////////// START SERVER & SYNC DATABASE ///////////////////////
  models.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
      console.log("==> 🌎 Port: %s. Visit http://localhost:%s/",
        PORT,
        PORT
      );
    });
  });




