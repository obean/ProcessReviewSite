'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review.hasOne(models.User, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE'
      // })
      Review.hasOne(models.Reviewer, {
        foreignKey: 'reviewerId',
        onDelete: 'CASCADE'
      })
    }
  };
  Review.init({
    booking_date: DataTypes.STRING,
    general_feedback: DataTypes.STRING,
    TDD_rating:  DataTypes.INTEGER,
    TDD_description: DataTypes.STRING,
    Fluency_rating:  DataTypes.INTEGER,
    Fluency_description: DataTypes.STRING,
    Debut_rating: DataTypes.INTEGER,
    Debut_description: DataTypes.STRING,
    Model_rating: DataTypes.INTEGER,
    Model_description: DataTypes.STRING,
    Refactor_rating: DataTypes.INTEGER,
    Refactor_description: DataTypes.STRING,
    Agile_rating: DataTypes.INTEGER,
    Agile_description: DataTypes.STRING,
    Maintainability_rating: DataTypes.INTEGER,
    Maintainability_description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};