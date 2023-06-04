// const mongoose = require('mongoose');
// const env = require('./environment');
// mongoose.connect(`mongodb://localhost/${env.db}`);
// // mongoose.connect('mongodb://localhost/codeial_development');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });

// module.exports = db;

const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(
  `mongodb+srv://kanhaiya15399:Kanhaiya%408521@cluster0.tmqvak8.mongodb.net/?retryWrites=true&w=majority`
);
// mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;