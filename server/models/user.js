var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    hash: String,
    salt: String,
    movies: Array
  });

  userSchema.methods.setPassword = function(password) {
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  userSchema.methods.validPassword = function(password) {
      var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
      return this.hash === hash;
  };

  userSchema.methods.addMovie = function(movie) {
    var filtered = this.movies.filter(function(el) {
      return el.title === movie.title;
    });
    console.log(filtered);
    if (filtered.length == 0) {
      console.log(this.movies.indexOf(movie));
      this.movies.push(movie);
      return true;
    }
    return false;
  }

  userSchema.methods.deleteMovie = function(movie) {
    var newMovies = this.movies.filter(function(el) {
      return el.title !== movie.title;
    });
    console.log(newMovies);
    if (newMovies.length > 0) {
      console.log(this.movies);
      this.movies = newMovies;
      console.log(this.movies);
      return true;
    } else if (this.movies.length == 1) {
      this.movies.pop();
      return true;
    }
    return false;
  }

  userSchema.methods.generateJwt = function() {
    var email = this.email;
      return jwt.sign({
        _id: this._id,
        email: email,
        name: this.name,
    }, 'secret', { expiresIn: '1h' });
  };

  mongoose.model('User', userSchema);

