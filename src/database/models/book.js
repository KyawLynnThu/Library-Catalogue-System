'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models[DataBaseModelNames.CATEGORY], {
        foreignKey: {
          name: 'categoryId',
          allowNull: false,
        },
        as: 'category',
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      language: DataTypes.STRING,
      contentType: DataTypes.STRING,
      ISBN: DataTypes.STRING,
      genre: DataTypes.STRING,
      publisher: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      coverImageUrl: DataTypes.STRING,
      summary: DataTypes.TEXT,
      edition: DataTypes.STRING,
      totalPages: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.BOOK,
      underscored: true,
      paranoid: true,
    },
  );
  return Book;
};
