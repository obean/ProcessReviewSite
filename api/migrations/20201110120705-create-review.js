'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_date: {
        type: Sequelize.TEXT
      },
      general_feedback: {
        type: Sequelize.TEXT
      },

      TDD_rating: {
        type: Sequelize.INTEGER
      },

      TDD_description: {
        type: Sequelize.TEXT
      },

      Fluency_rating:{
        type: Sequelize.INTEGER
      },
      Fluency_description: {
        type: Sequelize.TEXT
      },

      Debut_rating:{
        type: Sequelize.INTEGER
      },
      Debut_description:{
        type: Sequelize.TEXT
      },

      Model_rating: {
        type: Sequelize.INTEGER
      },
      Model_description:{
        type: Sequelize.TEXT
      },

      Refactor_rating:{
        type: Sequelize.INTEGER
      },
      Refactor_description:{
        type: Sequelize.TEXT
      },

      Agile_rating:{
        type: Sequelize.INTEGER
      },
      Agile_description:{
        type: Sequelize.TEXT
      },

      Maintainability_rating: {
        type: Sequelize.INTEGER
      },
      Maintainability_description:{
        type: Sequelize.TEXT
      },

      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
        },
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
        model: 'Reviewers',
        key: 'id',
        as: 'reviewerId',
        },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};