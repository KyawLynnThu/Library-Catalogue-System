'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.BORROW_RECORD, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      member_id: {
        type: Sequelize.INTEGER,
      },
      book_id: {
        type: Sequelize.INTEGER,
      },
      borrow_date: {
        type: Sequelize.DATE,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      return_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable(DataBaseTableNames.BORROW_RECORD);
  },
};
