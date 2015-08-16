var db = require('./models');
var express = require('express');
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
// var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var FACEBOOK_APP_ID = '1658482547720054';
var FACEBOOK_APP_SECRET = 'fb9781c4351e3bb832153d4b9c91538b'

var app = express();

// var moviesController = require("./controllers/movies");
require('express-helpers')(app); // express helpers, used for link_to

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public')); // used for static files, like css
// app.use(ejsLayouts);
app.use(methodOverride('_method'))
app.use(session({
  secret: 'a;dkjsflkadsjflkas;fasldjf;asajfk',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
  app.use(passport.session());

////////////////FACEBOOK PASSPORT//////////////////////

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

//////////////////////////////////////////////////////

app.use(function(req,res,next){
  // req.session.user=7; //this line is for testing purposes make sure to comment it out before deploying
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    })
  }else{
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
})


app.get('/', function(req, res){
  res.render('auth/index');
  // });
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/auth/profile');
  });
// main controller
app.use('/auth',require('./controllers/auth.js'));



app.listen(process.env.PORT || 3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}