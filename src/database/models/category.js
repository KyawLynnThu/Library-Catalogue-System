'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models[DataBaseModelNames.BOOK], {
        foreignKey: {
          name: 'categoryId',
          allowNull: false,
        },
        as: 'books',
      });
    }
  }
  Category.init(
    {
      categoryName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.CATEGORY,
      underscored: true,
      paranoid: true,
    },
  );
  return Category;
};
