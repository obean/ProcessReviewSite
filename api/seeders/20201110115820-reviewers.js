'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviewers', [{
      firstName: 'Court',
      lastName: 'Donald',
      email: 'court@doe.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Johnny',
      lastName: 'Yip',
      email: 'john@smith.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Xav',
      lastName: 'Defontaine',
      email: 'xav@stone.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviewers', null, {});
  }
};