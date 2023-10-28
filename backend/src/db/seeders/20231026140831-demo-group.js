'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [{
      name: 'Dev',
      description: 'Developer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Leader',
      description: 'Leader',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Customer',
      description: 'Customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Guest',
      description: 'Guest',
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
