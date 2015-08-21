var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models')
app.use(bodyParser.urlencoded({extended:true}));

// console.log('test');
// var userId = 1;
////////////////////////////////////////////////////////////
//user creation flow - works
// db.user.create({
//   name: 'test',
//   email: 'test@gmail.com',
//   password: 'password'
// }).then(function(user){
//   console.log(user.get());
// });
////////////////////////////////////////////////////////////
//access user - works
// db.user.find({where: {id: userId}}).then(function(user){
//   console.log(user.get());
// });
////////////////////////////////////////////////////////////
//user date creation - works

// var dateTitle = 'test date 1';
// db.user.find({where: {id: userId}}).then(function(user){
//   // console.log(user.id);
//   db.date.findOrCreate({ where: {title: dateTitle},
//     defaults: {userId: user.id}
//   }).spread(function(date, created){
//     console.log(date.get());
//   });
// });
////////////////////////////////////////////////////////////
//venue creation through datesVenues - working, need to adjust model for lat,lng
// var dateId = 1;
// var venue = {
//   id: "55c6e371498eb8845e94c84b",
//   name: 'test venue 1',
//   location: {
//     address: '1650 E Olive Way',
//     lat: 47.61975114261211,
//     lng: -122.32393626490352,
//     postalCode:'98102',
//     city: 'Seattle',
//     state: 'WA',
//   },
//   url: 'http://theoatmeal.com/'
// };
// // console.log(venue);
// // by title
// db.date.find({where: {id: dateId}}).then(function(date){
//   db.venue.findOrCreate({include: [db.date],
//     where: {name: venue.name}, defaults: {
//       apiId: venue.id
//       url: venue.url,
//       lat: venue.location.lat,
//       lng: venue.location.lng,
//       address: venue.location.address,
//       city: venue.location.city,
//       state: venue.location.state,
//       zip: venue.location. postalCode
//     }}).spread(function(venue, created){
//       date.addVenue(venue).then(function(){
//       console.log(venue.get());
//       })
//     })
// })
// by venue.id
// db.date.find({where: {id: dateId}}).then(function(date){
//   db.venue.findOrCreate({include: [db.date], where: {apiId: venue.id}, defaults: {
//     name: venue.name,
//     url: venue.url,
//     lat: venue.location.lat,
//     lng: venue.location.lng,
//     address: venue.location.address,
//     city: venue.location.city,
//     state: venue.location.state,
//     zip: venue.location.postalCode
//   }}).spread(function(venue, created){
//     date.addVenue(venue).then(function(){
//     console.log(venue.get());
//     })
//   })
// })



// db.date.find({where: {id: 10}, include: [db.venue]}).then(function(date){
//   console.log(date.venues.length);
// })








