'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupRoles', [{
      groupId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 2,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 2,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 2,
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 2,
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 3,
      roleId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 3,
      roleId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 3,
      roleId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 3,
      roleId: 5,
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
