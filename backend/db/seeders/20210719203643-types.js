'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Types', [
     {type:'Camp Ground', createdAt: new Date(), updatedAt: new Date() },
     {type:'Woods', createdAt: new Date(), updatedAt: new Date() },
     {type:'Cabin', createdAt: new Date(), updatedAt: new Date() },
     {type:'Tree house', createdAt: new Date(), updatedAt: new Date() },
     {type:'Glamping', createdAt: new Date(), updatedAt: new Date() },
     {type:'RV Park', createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Types', null, {});
  }
};
