var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

//GET /auth--display auth index form
router.get('/',function(req,res){
  res.render('auth/index.ejs',{currentUser:req.user})
})
//GET /auth/login--display
router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /auth/login --process login data and login user
router.post('/login',function(req,res){
  passport.authenticate(
    'local',
    {badRequestMessage:'You must enter e-mail and password.'},
    function(err,user,info){
      if(user){
        req.login(user,function(err){
          if(err) throw err;
          req.session.user = user;
          req.flash('success','You are now logged in.');
          res.redirect('/dates');
        });
      }else{
        req.flash('danger',info.message || 'Unknown error.');
        res.redirect('/auth/login');
      }
    }
  )(req,res);
});

//OAUTH authentication
router.get('/login/:provider',function(req,res){
  passport.authenticate(
    req.params.provider,
    {scope:['public_profile','email']}
  )(req,res);
});
//gets callback from facebook
router.get('/callback/:provider',function(req,res){
  passport.authenticate(req.params.provider,function(err,user,info){
    if(err) throw err;
    if(user){
      req.login(user,function(err){
        if(err) throw err;
        // req.flash('success','You are now logged in.');
        res.redirect('/dates');

      });
    }else{
      req.flash('danger',info.message || 'Unknown error.');
      res.redirect('/auth/login');
    }
  })(req,res);
});

//GET /auth/signup--/display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});
//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
    //do sign up here (add user to database)
    if(req.body.password != req.body.password2){
      req.flash('danger','Passwords must match.');
      res.redirect('/auth/signup');
    } else {
      db.user.findOrCreate({
        where:{email: req.body.email},
        defaults:{
          email: req.body.email,
          password: req.body.password,
          name:req.body.name
        }
      }).spread(function(user,created){
        if(created){
          //user is signed up forward them to the home page
          req.flash('success','Thank your for joining cheapdate!')
          res.redirect('/auth/login');
        } else {
          req.flash("danger","A user with that e-mail address already exists.");
          res.redirect('/auth/signup');
        }
      }).catch(function(err){
        if(err.message){
          req.flash('danger',err.message);
        }else{
          req.flash('danger','unknown error');
        }
        res.redirect('/auth/signup');
      })
    }
});

//GET /auth/logout--logout logged in user
router.get('/logout',function(req,res){
    req.session.user = undefined;
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/');
});


module.exports = router;