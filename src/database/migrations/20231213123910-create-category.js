'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.CATEGORY, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable(DataBaseTableNames.CATEGORY);
  },
};
