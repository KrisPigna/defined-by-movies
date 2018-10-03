var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
mongoose.connect('mongodb://kris:mary123@ds145951.mlab.com:45951/definedbymovies', { useNewUrlParser: true });
var cors = require('cors');

router.options('/register', cors());

router.post('/register', function(req, res, next) {
    var newUser = new user;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    newUser.save().then(function() {
        res.send({Message: "User successfully created."});
    }, function(err) {
        res.send({Message: "Error"});
    });
});

router.post('/login', function(req, res, next) {
    var userModel = mongoose.model('User', user.userShema);

    userModel.findOne({name: req.body.name}, function(err, savedUser) {
        if (err) {
            res.send({validated: false, message: "An unexpected error occured." });
        } else if (savedUser === null) {
            res.send({validated: false, message: "Username or password is invalid." });
        } else if (!savedUser.validPassword(req.body.password)) {
            res.send({validated: false, message: "Username or password is invalid." });
        } else {
            res.send({validated: true, message: "Login successful.", token: savedUser.generateJwt(), name: req.body.name});
        }
    });
});

router.post('/searchName', function(req, res, next) {
    var newUser = new user;
    newUser.findOne({'user.name': req.body.name}, function(err) {
        if (err) { 
            res.body = {'exists': true };
        } else {
            res.body = {'exists': false }
        }
    })
});

module.exports = router;