var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var db = require('./models')
app.use(bodyParser.urlencoded({extended:true}));



console.log('test');

