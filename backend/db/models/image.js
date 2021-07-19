'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: DataTypes.INTEGER,
    imgSrc: DataTypes.TEXT
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};