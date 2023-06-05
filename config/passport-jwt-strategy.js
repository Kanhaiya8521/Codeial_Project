const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const keys = require('./keys');
const env = require('./environment');
const User = require('../models/user');

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial", //env.jwt_secret, //'codeial'
};
// keys.secreteOrKey = 'Codeial'


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    console.log('jwtPayLoad', jwtPayLoad);
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){console.log('Error in finding user from JWT'); return;}
        if(user)return done(null, user);
        else return done(null, false);
    })
}));

module.exports = passport;
