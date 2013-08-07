
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//CONNECT TO MONGODB USING MONGOOSE
// mongoose.connect('mongodb://localhost/test');

//DEFINE PASSAGE SCHEMA
// var passageSchema = mongoose.Schema({
//     id: Number,
//     title: String,
//     body: String
// });

// var Passage = mongoose.model('Passage', passageSchema);

//INDEX
app.get('/', function(req, res) {
  res.render('index');
});

//ALL PASSAGES
app.get('/passage', function(req, res) {
  Passage.find({}, function(err, docs){
    res.render('passage/index', { passages: docs});
  });
  
  // res.render('passage/index');
});

// NEW
app.get('/passage/new', function(req, res) {
  res.render('passage/new');
});

// CREATE
app.post('/passage', function(req, res) {
  var b = req.body;
  var passage = new Passage({
    id: 1,
    title: b.title,
    body: b.body
  });

  passage.save(function(err, docs) {
    res.redirect('/');
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
