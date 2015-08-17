'use strict';
module.exports = function(sequelize, DataTypes) {
  var venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    apiId: DataTypes.STRING,
    url: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
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