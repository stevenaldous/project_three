var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
require('express-helpers')(app);
var request = require('request');
var session = require('express-session');
var flash = require('connect-flash');
var results = require('./models/4square.json');
app.use(flash());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
app.use('/users', require('./controllers/users.js'));
app.use('/dates', require('./controllers/dates.js'));
app.set("layout extractScripts", true);
app.use(express.static('assets'));


//////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('main/index');
});

app.get('/about', function(req, res){
  res.render('main/about');
});


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
app.get('/search', function(req,res) {
  res.render('search');
});

app.get('/results', function(req,res) {
  var fourSquareId = process.env.FOURSQUARE_ID;
  var fourSquareSecret = process.env.FOURSQUARE_SECRET;
  var seattle = '47.6097,-122.3331';

  var url = ("https://api.foursquare.com/v2/venues/search?client_id=" +
   fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20130815" +
   "&ll=" + seattle +
  "&query=" + req.query.what);

  request(url, function(error, response, data) {
    // res.send(JSON.parse(data));
    res.render('results', { results: JSON.parse(data) });
  });
});

// Populate the eventful results
app.get('/eventsResults', function(req,res) {
    var eventfulId = process.env.EVENTFUL_ID;
    var seattle = '47.6097,-122.3331';
    var radius =  25;
    var keywords = req.query.keywords;

    var url = ("http://api.eventful.com/json/events/search?app_key=" + eventfulId +
"&where=" + seattle + "&within=" + radius + "&keywords=" + keywords)

    request(url, function(error, response, data) {
        res.render('eventsResults', {data:JSON.parse(data)});
    });

})

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, function(){
  console.log("You're lisening to the smooth sounds of Port 3000")
});




