const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcrypt');
module.exports = function(passport){
  passport.use('local-login', new LocalStrategy({
			username: 'username',
			password: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){
			process.nextTick(function(){
				User.findOne({'local.username': username}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No user found.'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
					}
					return done(null, user);

				});
			});
		}
	));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
