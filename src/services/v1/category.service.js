const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/constants');
const Category = require('../../database/models')[DataBaseModelNames.CATEGORY];

const categoryService = {
  index: async () => {
    try {
      const categories = await Category.findAll({
        where: { deletedAt: null, status: 1 },
        attributes: ['id', 'categoryName', 'status'],
        order: [['categoryName', 'ASC']],
      });

      return {
        message: 'Retrieved All Category Lists Successfully.',
        data: categories,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (req) => {
    try {
      const { categoryName, status } = req.body;

      const category = await Category.create({
        categoryName,
        status,
      });

      if (!category) {
        throw new Error('Failed to create category');
      }

      return {
        message: 'Category created successfully',
        data: category,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  show: async (req) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        where: { deletedAt: null, status: 1 },
        attributes: ['id', 'categoryName', 'status'],
      });

      if (!category) {
        throw new Error('Category Not Found.');
      }

      return {
        message: 'Retrieved Category Details Successfully.',
        data: category,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (req) => {
    try {
      const { categoryName, status } = req.body;
      const categoryId = req.params.id;

      const category = await Category.findByPk(categoryId, {
        where: { deletedAt: null },
      });

      if (!category) {
        throw new Error('Category Not Found.');
      }

      const existingCategory = await Category.findOne({
        where: {
          [Op.and]: [
            {
              categoryName,
            },
            { id: { [Op.ne]: categoryId } },
            { deletedAt: null },
          ],
        },
      });

      if (existingCategory) {
        throw new Error('Category name already exists');
      }

      const updatedCategory = await category.update({
        categoryName,
        status,
      });

      if (!updatedCategory) {
        throw new Error('Failed to update category');
      }
      return {
        message: 'Category updated successfully',
        data: updatedCategory,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (req) => {
    try {
      const categoryId = req.params.id;

      const category = await Category.findByPk(categoryId, {
        where: { deletedAt: null },
      });

      if (!category) {
        throw new Error('Category not found or already deleted');
      }

      const result = await category.destroy();

      if (!result) {
        throw new Error('Failed to delete category');
      }

      return {
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = categoryService;
