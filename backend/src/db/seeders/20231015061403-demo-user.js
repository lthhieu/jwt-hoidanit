'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'tran@gmail.com',
      username: 'Tran',
      phone: '1',
      groupId: 1,
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'quyen@gmail.com',
      username: 'Quyen',
      phone: '2',
      groupId: 1,
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '3@gmail.com',
      username: '3',
      phone: '3',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '4@gmail.com',
      username: '4',
      phone: '4',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '5@gmail.com',
      username: '5',
      phone: '5',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '6@gmail.com',
      username: '6',
      phone: '6',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '7@gmail.com',
      username: '7',
      phone: '7',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '8@gmail.com',
      username: '8',
      phone: '8',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '9@gmail.com',
      username: '9',
      phone: '9',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '10@gmail.com',
      username: '10',
      phone: '10',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '11@gmail.com',
      username: '11',
      phone: '11',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '12@gmail.com',
      username: '12',
      phone: '12',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '13@gmail.com',
      username: '13',
      phone: '13',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '14@gmail.com',
      username: '14',
      phone: '14',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '15@gmail.com',
      username: '15',
      phone: '15',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: '16@gmail.com',
      username: '16',
      phone: '16',
      password: bcrypt.hashSync('password', saltRounds),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
