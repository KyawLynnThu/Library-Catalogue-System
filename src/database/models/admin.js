'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate() {}
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      authToken: DataTypes.STRING,
      accountType: DataTypes.ENUM('SUPER_ADMIN', 'LIBRARIAN'),
      accountStatus: DataTypes.ENUM('ACTIVATED', 'DEACTIVATED'),
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
