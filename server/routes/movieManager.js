var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
mongoose.connect('mongodb://kris:mary123@ds145951.mlab.com:45951/definedbymovies', { useNewUrlParser: true });
var cors = require('cors');
var jwt = require('jsonwebtoken');

router.options('/add-movie', cors());

router.post('/add-movie', function(req, res, next) {
    var userModel = mongoose.model('User', user.userShema);
    var username = jwt.verify(req.body[1], 'secret');
    username = username.name;
    userModel.findOne({name: username}, function(err, savedUser) {
        var added = savedUser.addMovie(req.body[0]);
        if (added === true) {
            savedUser.save();
            res.send({added: true});
        }
        else {
            res.send({added: false});
        }
    });
});

router.post('/delete-movie', function(req, res, next) {
    var userModel = mongoose.model('User', user.userShema);
    var username = jwt.verify(req.body[1], 'secret');
    username = username.name;
    userModel.findOne({name: username}, function(err, savedUser) {
        var deleted = savedUser.deleteMovie(req.body[0]);
        if (deleted === true) {
            savedUser.save();
            res.send({deleted: true});
        }
        else {
            res.send({deleted: false});
        }
    });
});

router.post('/get-movies', function(req, res, next) {
    var userModel = mongoose.model('User', user.userShema);
    var username = jwt.verify(req.body.token, 'secret');
    username = username.name;
    userModel.findOne({name: username}, function(err, savedUser) {
        res.send(savedUser.movies);
    });
});

router.get('/get-public-movies', function(req, res, next) {
    var userModel = mongoose.model('User', user.userShema);
    username = req.query['name'];
    userModel.findOne({name: username}, function(err, savedUser) {
        res.send(savedUser.movies);
    });
});

module.exports = router;