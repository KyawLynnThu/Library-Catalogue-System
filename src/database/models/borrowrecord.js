'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class BorrowRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  BorrowRecord.init(
    {
      memberId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      borrowDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.BORROW_RECORD,
      paranoid: true,
      underscored: true,
    },
  );
  return BorrowRecord;
};
