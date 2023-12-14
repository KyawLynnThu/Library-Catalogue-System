'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class AuthorBook extends Model {
    static associate(models) {
      models[DataBaseModelNames.AUTHOR].belongsToMany(
        models[DataBaseModelNames.BOOK],
        {
          through: AuthorBook,
          foreignKey: 'authorId',
          as: 'authors',
        },
      );
      models[DataBaseModelNames.BOOK].belongsToMany(
        models[DataBaseModelNames.AUTHOR],
        {
          through: AuthorBook,
          foreignKey: 'bookId',
          as: 'books',
        },
      );
    }
  }
  AuthorBook.init(
    {
      authorId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.AUTHOR_BOOK,
      underscored: true,
      paranoid: true,
    },
  );
  return AuthorBook;
};
