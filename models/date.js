'use strict';
module.exports = function(sequelize, DataTypes) {
  var date = sequelize.define('date', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.date.belongsTo(models.user);
        models.date.belongsToMany(models.venue, {through: "datesVenues"});
      }
    }
  });
  return date;
};