'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL
  }, {});
  Listing.associate = function(models) {
    Listing.hasMany(models.Review, {foreignKey: 'spotId'})
    Listing.hasMany(models.Image, {foreignKey: 'spotId'})
    Listing.hasMany(models.Booking, {foreignKey: 'spotId'})
    Listing.belongsTo(models.User, {foreignKey: 'userId'})
    Listing.belongsTo(models.Type, {foreignKey: 'typeId'})
  };
  return Listing;
};
