var authController = require('../controllers/authcontroller.js');
var db = require("../models");
module.exports = function(app,passport){

app.get('/signup', authController.signup);

app.get('/login', authController.signin)

app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signup'}
                                                    ));

app.get('/home', isLoggedIn, authController.home);

app.get('/dashboard',isLoggedIn, authController.dashboard);


app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signin'}
                                                    ));

app.post('/api/newmeal', function(req, res) {
    db.Meal.create(req.body).then(function(dbmeal){
        res.json(dbmeal);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}






