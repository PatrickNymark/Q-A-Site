const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Load Model
const User = require('../models/User');

const params = {
  secretOrKey: require('../config/keys').secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(params, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch(err => res.status(400).json(err));
    })
  );
};
