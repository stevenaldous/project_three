'use strict';
module.exports = function(sequelize, DataTypes) {
  var venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    lat: DataTypes.FLOAT(15),
    lng: DataTypes.FLOAT(15),
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.venue.belongsToMany(models.date, {through: "datesVenues"});
      }
    }
  });
  return venue;
};