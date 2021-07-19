'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};