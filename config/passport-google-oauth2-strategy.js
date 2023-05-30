const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');
const User = require('../models/user');

passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      // clientID: "876982813639-v57d3380s7s0qtvdj8l3o90c8i3u3r47.apps.googleusercontent.com",
      clientSecret: env.google_client_secret,
      // clientSecret: "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",
      callbackURL: env.google_callback_url,
      // callbackURL: "http://localhost:3000/users/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }

        // console.log(profile); // Google have multi email, and when I write emails[0] means this email I have to login
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;