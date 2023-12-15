const { DataBaseTableNames } = require('../constants');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(DataBaseTableNames.CATEGORY, [
      {
        category_name: 'Fantasy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Horror',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Romance',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Mystery/Thriller',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'History',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Travel',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Science',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Philosophy',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_name: 'Psychology',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(DataBaseTableNames.CATEGORY, null, {});
  },
};
