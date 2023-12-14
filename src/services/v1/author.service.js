const { DataBaseModelNames } = require('../../database/constants');
const Author = require('../../database/models')[DataBaseModelNames.AUTHOR];

const authorService = {
  index: async () => {
    try {
      await Author.findAll({
        where: { deletedAt: null, status: 1 },
        attributes: ['id', 'categoryName', 'sort', 'status'],
        order: [['sort', 'ASC']],
      });

      return {
        message: 'Retrieved all author lists Successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (_req) => {
    try {
      return {
        message: 'Author created successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  show: async (_req) => {
    try {
      return {
        message: 'Retrieved author details successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (_req) => {
    try {
      return {
        message: 'Author updated successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (_req) => {
    try {
      return {
        message: 'Author deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = authorService;
