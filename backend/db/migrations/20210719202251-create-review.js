'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        references: {model: 'Listings'},
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        references: {model: 'Users'},
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
