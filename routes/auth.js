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
app.get('/api/allmeals', isLoggedIn, function(req,res){
db.Meal.findAll({where: {userid: req.user.id}}).then(function(dbmeals){
    res.json(dbmeals);
})
});

app.post('/api/newmeal',isLoggedIn, function(req, res) {
    console.log(req.user.id);
    var reqwid = { 
        meal: req.body.meal,
        food: req.body.food,
        userId: req.user.id
    };
    db.Meal.create(reqwid).then(function(dbmeal){
        res.redirect('/home')
    });
});

function isLoggedIn(req, res, next) {
    // console.log(req);
    if (req.isAuthenticated()){
        return next();
    }else {res.redirect('/signin')};
}


};






