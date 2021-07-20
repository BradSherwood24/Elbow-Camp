'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      userId: {
        references: {model: 'Users'},
        allowNull: false,
        type: Sequelize.INTEGER
      },
      typeId: {
        references: {model: 'Types'},
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      lat: {
        type: Sequelize.DECIMAL(20,5)
      },
      long: {
        type: Sequelize.DECIMAL(20,5)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6,2)
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
    return queryInterface.dropTable('Listings');
  }
};
