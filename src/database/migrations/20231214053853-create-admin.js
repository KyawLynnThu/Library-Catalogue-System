'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.ADMIN, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      auth_token: {
        type: Sequelize.STRING,
      },
      account_type: {
        type: Sequelize.ENUM,
        values: ['SUPER_ADMIN', 'LIBRARIAN'],
        defaultValue: 'LIBRARIAN',
        allowNull: false,
      },
      account_status: {
        type: Sequelize.ENUM,
        values: ['ACTIVATED', 'DEACTIVATED'],
        defaultValue: 'ACTIVATED',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(DataBaseTableNames.ADMIN);
  },
};
