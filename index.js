var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
require('express-helpers')(app);
var request = require('request');
var results = require('./models/4square.json')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);

app.set("layout extractScripts", true);

app.use(express.static('assets'));

app.get('/', function(req, res) {

  res.render('index');

});

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
    res.render('results', {results: JSON.parse(data) });
  });
});

app.listen(process.env.PORT || 3000);
