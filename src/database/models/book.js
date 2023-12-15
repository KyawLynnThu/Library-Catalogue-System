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

      Book.belongsTo(models[DataBaseModelNames.AUTHOR], {
        foreignKey: {
          name: 'authorId',
          allowNull: false,
        },
        as: 'author',
      });

      Book.hasMany(models[DataBaseModelNames.BORROW_RECORD], {
        foreignKey: {
          name: 'memberId',
        },
        as: 'member',
      });

      Book.hasMany(models[DataBaseModelNames.BOOK_RESERVE], {
        foreignKey: {
          name: 'bookId',
        },
        as: 'books',
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      language: DataTypes.STRING,
      contentType: DataTypes.STRING,
      isbn: DataTypes.STRING,
      genre: DataTypes.STRING,
      publisher: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      coverImage: DataTypes.STRING,
      coverImageUrl: DataTypes.STRING,
      summary: DataTypes.TEXT,
      edition: DataTypes.STRING,
      totalPages: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
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
