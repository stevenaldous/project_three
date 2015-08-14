var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
// app.use(express.static('assets'));

app.get("/", function(req, res){
    res.send("hello, world");
});

app.listen(process.env.PORT || 3000);