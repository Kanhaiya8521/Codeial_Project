const developement = {
  name: "developement",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSL
    auth: {
      user: "kannatokanhaiya@gmail.com",
      pass: "oeytpzrkijughbtq", // go to myaccount.google.com/security 2step verification then on then app password
    },
  },

  google_client_id:
    "876982813639-v57d3380s7s0qtvdj8l3o90c8i3u3r47.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:3000/users/auth/google/callback",

  jwt_secret: "codeial",
};

const production = {
    name: 'production',


}

module.exports = developement ;