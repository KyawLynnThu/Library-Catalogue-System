'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
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
