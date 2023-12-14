const bcrypt = require('bcrypt');

const { DataBaseTableNames } = require('../constants');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(DataBaseTableNames.ADMIN, [
      {
        name: 'Super Admin',
        email: 'superadmin@gmail.com',
        password: bcrypt.hashSync('@dminPass123', 8),
        auth_token: null,
        account_type: 'SUPER_ADMIN',
        account_status: 'ACTIVATED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Librarian',
        email: 'librarian@gmail.com',
        password: bcrypt.hashSync('@dminPass123', 8),
        auth_token: null,
        account_type: 'LIBRARIAN',
        account_status: 'ACTIVATED',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(DataBaseTableNames.ADMIN, null, {});
  },
};
