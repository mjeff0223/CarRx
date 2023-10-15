const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models')
const User = db.User;
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret; // Use a strong secret key or environment variable



module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // Find the user based on the JWT payload (usually the user ID)
        User.findByPk(jwt_payload.id)
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                return done(null, user);
            })
            .catch(err => {
                if (err.name === 'TokenExpiredError') {
                    return done(null, false, { message: 'Token has expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return done(null, false, { message: 'Invalid token' });
                }
                return done(err, false);
            });
    }));

}