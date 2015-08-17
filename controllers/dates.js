var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

//get /dates dates home page
router.get('/', function(req, res){
  res.render('dates/index');
});

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