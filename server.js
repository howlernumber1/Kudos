const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));


// -----------------Database configuration with Mongoose---------------
// -----------------Define local MongoDB URI---------------
var databaseUri = 'mongodb://localhost/kudosApp';
//------------------------------------------------
if (process.env.MONGODB_URI) {
//THIS EXECUTES IF THIS IS BEING EXECUTED IN YOUR HEROKU APP
  mongoose.connect(process.env.MONGODB_URI);
} else {
//THIS EXECUTES IF THIS IS BEING EXECUTED ON YOUR LOCAL MACHINE
  mongoose.connect(databaseUri);
}
//-----------------End database configuration-------------------------

var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
})

// require api routes
require('./routes/api-routes')(app);

//once logged in to the db through mongosse, log a success message
db.once('open', function() {
  console.log('Mongoose connection sucessful.');
})

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
