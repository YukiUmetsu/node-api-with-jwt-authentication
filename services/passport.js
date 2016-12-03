const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email'};  // default assume it has username property
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // If it is the correct email and password, otherwise call done with false

  // get user with the email
  User.findOne({ email: email}, function (err, user) {
    if (err){ return done(err); }
    if (!user){ return done(null, false); }

    // Compare password by encrypting provided password and comparing it with the stored encrypted password
    user.comparePassword(password, function (err, isMatch) {
      if (err){ return done(err); }
      if(!isMatch){ return done(ull, false); }

      // assign user to req.user
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // check authorization in the header to get jwt
  secretOrKey: config.secret // use this secret to decode jwt
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {// payload is a decoded jwt token
  // find the user, if user exists call done with the user, otherwise call done with false
  User.findById(payload.sub, function (err, user) {
    if (err){ return done(err, false); }

    if (user){
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);