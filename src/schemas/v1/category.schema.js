const categorySchema = {
  create: {
    categoryName: {
      notEmpty: { errorMessage: 'Category name field is required.' },
    },
  },
};

module.exports = categorySchema;
