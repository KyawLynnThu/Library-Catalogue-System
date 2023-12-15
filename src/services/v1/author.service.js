const dayjs = require('dayjs');
const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/constants');
const Author = require('../../database/models')[DataBaseModelNames.AUTHOR];

const authorService = {
  index: async (req) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;
      const keyword = req.query.keyword;

      const offset = (page - 1) * pageSize;

      let whereCondition = { deletedAt: null };
      if (keyword) {
        whereCondition = {
          ...whereCondition,
          authorName: { [Op.like]: `%${keyword}%` },
        };
      }

      const authors = await Author.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'authorName', 'birthDate', 'biography'],
        limit: pageSize,
        offset: offset,
      });

      const totalPages = Math.ceil(authors.count / pageSize);

      return {
        message: 'Retrieved all author lists Successfully.',
        currentPage: page,
        totalPages: totalPages,
        pageSize: pageSize,
        totalCounts: authors.count,
        data: authors.rows,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (req) => {
    try {
      const { authorName, birthDate, biography } = req.body;
      const formattedBirthDate = dayjs(birthDate).format('YYYY-MM-DD');

      const author = await Author.create({
        authorName,
        birthDate: formattedBirthDate,
        biography,
      });

      if (!author) {
        throw new Error('Failed to create category');
      }

      return {
        message: 'Author created successfully',
        data: author,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  show: async (req) => {
    try {
      const author = await Author.findByPk(req.params.id, {
        where: { deletedAt: null },
        attributes: ['id', 'authorName', 'birthDate', 'biography'],
      });

      if (!author) {
        throw new Error('Author Not Found.');
      }

      return {
        message: 'Retrieved author details successfully.',
        data: author,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (req) => {
    try {
      const { authorName, birthDate, biography } = req.body;
      const authorId = req.params.id;

      const author = await Author.findByPk(authorId, {
        where: { deletedAt: null },
      });

      if (!author) {
        throw new Error('Author Not Found.');
      }

      const updatedCategory = await author.update({
        authorName,
        birthDate,
        biography,
      });

      if (!updatedCategory) {
        throw new Error('Failed to update author');
      }

      return {
        message: 'Author updated successfully',
        data: updatedCategory,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (req) => {
    try {
      const authorId = req.params.id;

      const author = await Author.findByPk(authorId, {
        where: { deletedAt: null },
      });

      if (!author) {
        throw new Error('Author not found or already deleted');
      }

      const result = await author.destroy();

      if (!result) {
        throw new Error('Failed to delete author');
      }

      return {
        message: 'Author deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = authorService;
