var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


//get /users/signup -- access signup form
// router.get('/signup', function(req, res){
//   res.render('users/index')
// });
// //post /users/signup -- create user
// router.post('/signup', function(req, res){
//   if (req.body.password !== req.body.password2){
//     // req.flash('danger', 'Passwords must match!');
//     res.redirect('/users/signup');
//   } else {
//     db.user.findOrCreate({where: {email: req.body.email},
//       defaults: {
//         name: req.body.name,
//         password: req.body.password
//       }}).spread(function(user, created){
//         if(created){
//           // req.flash('success', 'Thank you for joining cheapdate!');
//           res.redirect('/users/login');
//         }else{
//           // req.flash('danger', 'Something went wrong! That email or username is taken already');

//         }
//       }).catch(function(err){
//         if(err){
//           // req.flash('danger',err.message)
//         }else{
//           // req.flash('danger', 'We have no idea what went wrong.')
//         } res.redirect('/users/signup');
//       })
//   }
// });

// //get /users/login -- access login form
// router.get('/login', function(req, res){
//   res.render('users/login')
// });

// //post /users/login -- login user
// router.post('/login', function(req, res){
//   db.user.find({where: {name: req.body.name}}).then(function(user){
//     res.redirect('/dates');
//   })
// })


module.exports=router;