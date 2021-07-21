'use strict';
module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Type', {
    type: DataTypes.STRING
  }, {});
  Types.associate = function(models) {
    // Type.hasMany(models.Listing, {foreignKey: 'typeId'})
  };
  return Types;
};
