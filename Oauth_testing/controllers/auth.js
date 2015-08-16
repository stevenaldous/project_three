var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/',function(req,res){
  res.render('auth/index.ejs');
})

router.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('auth/login.ejs', { message: req.flash('loginMessage') });
});

router.get('/profile', function(req, res) {
    res.render('auth/profile', {user:req.currentUser});
});

router.post('/login',function(req,res){
    //do login here (check password and set session value)
    db.user.authenticate(req.body.email,req.body.password,
      function(err,user){
        if(err){
          res.send(err);
        } else if(user){
          //user is logged in forward them to the home page
          req.session.user = user.id;
          req.flash('success','You\'re logged in')
          res.redirect('/auth/profile');
        } else {
          req.flash('danger','invalid username or password');
          res.redirect('/auth/login');
        }
    // res.send(req.body);
    });
});

router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('auth/signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup',function(req,res){
  console.log('top of signup')
    //do sign up here (add user to database)
    if(req.body.password != req.body.password2){
      req.flash('danger','Passwords must match.');
      res.redirect('/auth/signup');
    } else {
      console.log('before find or create')
      db.user.findOrCreate({
        where:{email: req.body.email},
        defaults:{
          email: req.body.email,
          password: req.body.password,
          name:req.body.name
        }
      }).spread(function(user,created){
        console.log('in spread',created);
        if(created){
          //user is signed up forward them to the home page
          req.flash('success','You\'re signed up.')
          res.redirect('/auth/profile');
        } else {
          req.flash("danger","A user with that e-mail address already exists.");
          res.redirect('/auth/signup');
        }
      }).catch(function(err){
        console.log('inside catch');
        if(err.message){
          req.flash('danger',err.message);
        }else{
          req.flash('danger','unknown error');
          console.log(err);
        }
        res.redirect('/auth/signup');
      })
    // res.send(req.body);
    }
});

router.get('/logout',function(req,res){
  req.flash('info','You have been logged out.');
  req.session.user = false;
  res.redirect('/');
});



// app.post('/auth/facebook/token',
//   passport.authenticate('facebook-token'),
//   function (req, res) {
//     // do something with req.user
//     res.send(req.user? 200 : 401);
//   }
// );

module.exports = router;