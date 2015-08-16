'use strict';
module.exports = function(sequelize, DataTypes) {
  var datesVenues = sequelize.define('datesVenues', {
    dateId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return datesVenues;
};