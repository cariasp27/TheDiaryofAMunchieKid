//////////////////// IMPORTS ////////////////////////////////////////////////////////////////////
var authController = require('../controllers/authcontroller.js');
var db = require("../models");
var moment = require('moment');
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
module.exports = function (app, passport) {
    //////////////////// IS LOGGED IN CHECK ////////////////////////////////////////////////////////////////
    function isLoggedIn(req, res, next) {
        // console.log(req);
        if (req.isAuthenticated()) {
            return next();
        } else { res.redirect('/signin') };
    }
    //////////////////// HTML Routes //////////////////////////////////////////////////////////////////////
    app.get('/', authController.signin);
    app.get('/signin', authController.signin);
    app.get('/login', authController.signin);
    // meal planner html route
    app.get('/mealplanner',isLoggedIn, authController.mealplanner);
    //////////////////// HOME /////////////////////////////////////////////////////////////////////////////
    app.get('/home', isLoggedIn, authController.home);

    //////////////////// POST NEW USER ////////////////////////////////////////////////////////////////////
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }));
    //////////////////// LOGOUT ///////////////////////////////////////////////////////////////////////////
    app.get('/logout', authController.logout);
    //////////////////// SIGN IN POST /////////////////////////////////////////////////////////////////////
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }));
    //////////////////// PLANNED JOURNAL ENTRIES ///////////////////////////////////////////////////////////
    app.get('/api/plannedmeal', isLoggedIn, function (req, res) {
        db.plannedMeal.findAll({
            where: { userId: req.user.id }
        }).then(function (preplannedmeals) {
            console.log("These are the pre-planned meals: " + preplannedmeals);
            res.json(preplannedmeals)
        })
    })
    //////////////////// TODAY'S JOURNAL ENTRIES ///////////////////////////////////////////////////////////
    app.get('/api/todaysjournal', isLoggedIn, function (req, res) {
        var datre = moment().format("YYYY-MM-DD");
        console.log("this is the date used to find todays journal: " + datre);
        var ewe = moment.utc().format("YYYY-MM-DD hh:mm:ss");
        db.Meal.findAll({
            where: {
                createdAt: { [Op.substring]: datre },
                userId: req.user.id
            }
        }).then(function (todaysmeals) {
            console.log("These are the meals from " + datre + ": " + todaysmeals);
            res.json(todaysmeals);
        })
    });
    //////////////////// SPECIFIC DATE ENTRIES /////////////////////////////////////////////////////////////
    //////////////////// date needs to be fixed ////////////////////////////////////////////////////////////

    app.get('/api/history/:date', isLoggedIn, function (req, res) {
        console.log(req.params.date)
        var searchdate = req.params.date;
        console.log(searchdate);
        var formatdate = moment(searchdate).format("YYYY-MM-DD");
        console.log(formatdate);
        db.Meal.findAll({
            where: {
                createdAt: { [Op.substring]: formatdate },
                userId: req.user.id
            }
        }).then(function (dbmeals) {
            res.json(dbmeals);
        })
    });
    //////////////////// POST NEW MEAL /////////////////////////////////////////////////////////////////////
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
    //////////////////// PLANNED JOURNAL ENTRIES ///////////////////////////////////////////////////////////
    app.post('/api/newplannedmeal', isLoggedIn, function (req, res) {
        var newplan = {
            meal: req.body.meal,
            food: req.body.food,
            userId: req.user.id
        };
        db.plannedMeal.create(newplan).then(function (dbmeal) {
            res.redirect('/home')
        });
    });
};