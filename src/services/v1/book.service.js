const { DataBaseModelNames } = require('../../database/constants/index');
const Book = require('../../database/models')[DataBaseModelNames.BOOK];

const bookService = {
  index: async () => {
    try {
      return {
        message: 'Retrieved all book lists successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (req) => {
    try {
      return {
        message: 'Book created successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  show: async (req) => {
    try {
      return {
        message: 'Retrieved book details Successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (req) => {
    try {
      return {
        message: 'Book updated successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (req) => {
    try {
      return {
        message: 'Book deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = bookService;
