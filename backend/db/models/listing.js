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
    // associations can be defined here
  };
  return Listing;
};
