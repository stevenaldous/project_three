var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

//get /dates dates home page
router.get('/', function(req, res){
  res.render('dates/index');
});

router.get('/search', function(req,res) {
  res.render('dates/search');
});

router.get('/results', function(req,res) {
  var fourSquareId = process.env.FOURSQUARE_ID;
  var fourSquareSecret = process.env.FOURSQUARE_SECRET;
  var seattle = '47.6097,-122.3331';

  var url = ("https://api.foursquare.com/v2/venues/search?client_id=" +
   fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20130815" +
   "&ll=" + seattle +
  "&query=" + req.query.what);

  request(url, function(error, response, data) {
    // res.send(JSON.parse(data));
    console.log(url);
    res.send(data);
  });
});

// Populate the eventful results
router.get('/eventsResults', function(req,res) {
    var eventfulId = process.env.EVENTFUL_ID;
    var seattle = '47.6097,-122.3331';
    var radius =  25;
    var keywords = req.query.keywords;

    var url = ("http://api.eventful.com/json/events/search?app_key=" + eventfulId +
"&where=" + seattle + "&within=" + radius + "&keywords=" + keywords)

    request(url, function(error, response, data) {
            res.send(data);
    });

})

//post create new date
router.post('/', function(req, res){
  var userId = 1;
  db.user.find({where: {id: userId}}).then(function(user){
   db.date.findOrCreate({ where: {title: req.body.name},
    defaults: {userId: user.id}
  }).spread(function(date, created){
    res.redirect('/dates')
    });
  });
});
// var dateTitle = 'test date 1';
// db.user.find({where: {id: userId}}).then(function(user){
//   // console.log(user.id);
//   db.date.findOrCreate({ where: {title: dateTitle},
//     defaults: {userId: user.id}
//   }).spread(function(date, created){
//     console.log(date.get());
//   });
// });




module.exports=router;