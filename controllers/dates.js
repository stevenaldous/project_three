var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

//get /dates dates home page
router.get('/', function(req, res){
  res.render('dates/index')
  // res.send(currentUser)
  // db.date.findAll({where: {userId: currentUser.id}}).then(function(dates){
  //   res.render('dates/index', {myDates: dates});
  // });
});

//post create new date
router.post('/', function(req, res){
  var userId = currentUser.id;
  db.user.find({where: {id: userId}}).then(function(user){
   db.date.findOrCreate({ where: {title: req.body.name},
    defaults: {userId: user.id}
  }).spread(function(date, created){
    res.redirect('/dates/'+date.id)
    });
  });
});

//get /dates/:id/search
router.get('/:id/search', function(req, res){
  res.render('dates/search')
})

module.exports=router;