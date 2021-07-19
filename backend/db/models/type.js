'use strict';
module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Type', {
    type: DataTypes.STRING
  }, {});
  Types.associate = function(models) {
    // associations can be defined here
  };
  return Types;
};
