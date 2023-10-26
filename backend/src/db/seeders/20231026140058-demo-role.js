'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      url: '/user/read',
      description: 'Read users',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/user/create',
      description: 'Create users',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/user/update',
      description: 'Update users',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/user/delete',
      description: 'Delete users',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/group/read',
      description: 'Read groups',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/role/create',
      description: 'Create Role',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/role/delete',
      description: 'Delete Role',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/role/read-by-groupid',
      description: 'Read Roles belong group',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/role/assign-group',
      description: 'Assign roles to group',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: '/role/read',
      description: 'Read Role',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
