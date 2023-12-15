'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models[DataBaseModelNames.BORROW_RECORD], {
        foreignKey: {
          name: 'memberId',
        },
        as: 'member',
      });
    }
  }
  Member.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      dob: DataTypes.DATE,
      accountStatus: DataTypes.ENUM('PENDING', 'ACTIVATED', 'DEACTIVATED'),
      authToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.MEMBER,
      paranoid: true,
      underscored: true,
    },
  );
  return Member;
};
