'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.Listing, {foreignKey: 'spotId'})
    Booking.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Booking;
};
