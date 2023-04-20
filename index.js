const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
 // used for session cookies
 const session = require('express-session');
 const passport = require('passport');
 const passportLocal = require('./config/passport-local-strategy');
 const passportJwt = require('./config/passport-jwt-strategy');
 const passportGoogle = require('./config/passport-google-oauth2-strategy');

 const MongoStore = require('connect-mongo');
 const sassmiddleware = require('node-sass-middleware');
 const flash = require('connect-flash');

 const customMware = require('./config/middleware');
  
 app.use(sassmiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
 }));

 const sassMiddleware = require('node-sass-middleware');
 
app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
