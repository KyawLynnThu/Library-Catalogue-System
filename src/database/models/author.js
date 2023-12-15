'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      Author.hasMany(models[DataBaseModelNames.BOOK], {
        foreignKey: {
          name: 'authorId',
        },
        as: 'books',
      });
    }
  }
  Author.init(
    {
      authorName: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      biography: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.AUTHOR,
      underscored: true,
      paranoid: true,
    },
  );
  return Author;
};
