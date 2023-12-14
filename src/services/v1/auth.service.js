const { DataBaseModelNames } = require('../../database/constants/index');
const ADMIN = require('../../database/models')[DataBaseModelNames.ADMIN];

const authService = {
  logIn: async () => {
    try {
      return {
        message: 'Log In successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  logOut: async () => {
    try {
      return {
        message: 'Log Out successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = authService;
