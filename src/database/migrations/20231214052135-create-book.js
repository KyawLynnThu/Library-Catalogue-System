'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.BOOK, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.STRING,
      },
      content_type: {
        type: Sequelize.STRING,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      publication_date: {
        type: Sequelize.DATE,
      },
      cover_image_url: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      edition: {
        type: Sequelize.STRING,
      },
      total_pages: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable(DataBaseTableNames.BOOK);
  },
};
