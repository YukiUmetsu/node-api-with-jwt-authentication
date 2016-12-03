const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false}); // no cookie based session needed
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
  // requireAuth checks jwt
  app.get('/', requireAuth, function(req, res, next){
    res.send(['watter bottle', 'chicken']);
  });
  // requireSingin does authentication with email and password (local authentication)
  // Authentication.signin does issuing jwt
  app.post('/signin', requireSignin, Authentication.signin);
  // Authentication.signup creates users and issue jwt
  app.post('/signup', Authentication.signup);
};