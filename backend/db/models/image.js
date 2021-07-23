'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: DataTypes.INTEGER,
    imgSrc: DataTypes.TEXT
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Listing, {foreignKey: 'spotId', onDelete: 'cascade'})
  };
  return Image;
};
