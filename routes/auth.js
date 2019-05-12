// import controller and models

var authController = require('../controllers/authcontroller.js');
var db = require("../models");
var moment = require('moment');
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
module.exports = function (app, passport) {
    function isLoggedIn(req, res, next) {
        // console.log(req);
        if (req.isAuthenticated()) {
            return next();
        } else { res.redirect('/signin') };
    }

    //////////////////// LOGIN ////////////////////////////
    app.get('/', authController.signin);
    app.get('/signin', authController.signin);

    //////////////////// POST NEW USER ////////////////////
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }
    ));

    app.get('/home', isLoggedIn, authController.home);

    app.get('/history', isLoggedIn, authController.history);

    // route for logging out
    app.get('/logout', authController.logout);



    // route for authenticating user
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }));

    // route for getting journal entries
    app.get('/api/todaysjournal', isLoggedIn, function (req, res) {
        // var NOW = moment().format("YYYY-MM-DD");
        db.Meal.findAll({
            where: {
                createdAt: { [Op.substring]: moment.utc().format("YYYY-MM-DD Z") },
                userId: req.user.id
            }
        }).then(function (dbmeals) {
            res.json(dbmeals);
        })
    });

    app.get('/api/history/', isLoggedIn, function (req, res) {
        var searchdate = req.body.date;
        console.log(searchdate);
        var formatdate = moment(searchdate).format("YYYY-MM-DD");
        console.log(formatdate);
        db.Meal.findAll({
            where: {
                createdAt: { [Op.substring]: formatdate },
                userId: req.user.id
            }
        }).then(function (dbmeals) {
            authController.history
        })
    });


    // route for handling new journal entry
    app.post('/api/newmeal', isLoggedIn, function (req, res) {
        console.log(req)
        console.log(req.user.id);
        var reqwid = {
            meal: req.body.meal,
            food: req.body.food,
            userId: req.user.id
        };
        db.Meal.create(reqwid).then(function (dbmeal) {
            res.redirect('/home')
        });
    });



};






