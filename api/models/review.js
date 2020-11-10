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
      Review.hasOne(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      Review.hasOne(models.Reviewer, {
        foreignKey: 'reviewerId',
        onDelete: 'CASCADE'
      })
    }
  };
  Review.init({
    booking_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};