const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});


const development = {
  name: "development",
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

  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: "codeial_production",
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

  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,

  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);