'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class BookReserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  BookReserve.init(
    {
      memberId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      reservationDate: DataTypes.DATE,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.BOOK_RESERVE,
      underscored: true,
    },
  );
  return BookReserve;
};
