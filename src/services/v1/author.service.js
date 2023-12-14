const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/constants/index');
const Author = require('../../database/models')[DataBaseModelNames.AUTHOR];

const authorService = {
  index: async () => {
    try {
      return {
        message: 'Retrieved all author lists Successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (req) => {
    try {
      return {
        message: 'Author created successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  show: async (req) => {
    try {
      return {
        message: 'Retrieved author details successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (req) => {
    try {
      return {
        message: 'Author updated successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (req) => {
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
