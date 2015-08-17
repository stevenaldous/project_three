var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

//GET /auth/login
//display login form
router.get('/',function(req,res){
  res.render('auth/index.ejs',{currentUser:req.user})
})

router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
  passport.authenticate(
    'local',
    {badRequestMessage:'You must enter e-mail and password.'},
    function(err,user,info){
      if(user){
        req.login(user,function(err){
          if(err) throw err;
          req.flash('success','You are now logged in.');
          res.redirect('/auth/profile');
        });
      }else{
        req.flash('danger',info.message || 'Unknown error.');
        res.redirect('/auth/login');
      }
    }
  )(req,res);
});

router.get('/login/:provider',function(req,res){
  passport.authenticate(
    req.params.provider,
    {scope:['public_profile','email']}
  )(req,res);
});

router.get('/callback/:provider',function(req,res){

  passport.authenticate(req.params.provider,function(err,user,info){
    if(err) throw err;
    if(user){
      req.login(user,function(err){
        if(err) throw err;
        req.flash('success','You are now logged in.');
        res.redirect('/auth/profile');
      });
    }else{
      req.flash('danger',info.message || 'Unknown error.');
      res.redirect('/auth/login');
    }
  })(req,res);
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

router.get('/profile', function(req, res) {
    res.render('auth/profile', {currentUser:req.user});
});

//POST /auth/signup
//create new user in database
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

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/auth/index');
});


module.exports = router;