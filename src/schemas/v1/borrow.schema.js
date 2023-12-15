const borrowSchema = {
  borrowBook: {
    bookIds: {
      notEmpty: { errorMessage: 'Book Id field is required.' },
      isArray: { errorMessage: 'Id must be array.' },
    },
  },
};

module.exports = borrowSchema;
