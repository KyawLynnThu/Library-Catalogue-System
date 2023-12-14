'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      accountType: DataTypes.STRING,
      accountStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: DataBaseModelNames.ADMIN,
      underscored: true,
      paranoid: true,
    },
  );
  return Admin;
};
