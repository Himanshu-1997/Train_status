const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*let db = mongoose.connection;
// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});*/


// Init App
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home Route
app.get('/', function(req, res){
      res.render('index');
});

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Route Files
let info = require('./routes/info');
app.use('/info', info);

// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});