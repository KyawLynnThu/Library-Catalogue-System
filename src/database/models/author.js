'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
