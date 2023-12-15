const bookSchema = {
  create: {
    title: {
      notEmpty: { errorMessage: 'Book Title is required.' },
    },
    categoryId: {
      notEmpty: { errorMessage: 'Category field is required.' },
    },
    authorId: {
      notEmpty: { errorMessage: 'Author name field is required.' },
    },
    language: {
      notEmpty: { errorMessage: 'Languagefield is required.' },
    },
    contentType: {
      notEmpty: { errorMessage: 'Content is required.' },
    },
    isbn: {
      notEmpty: { errorMessage: 'ISBN is required.' },
    },
    publisher: {
      notEmpty: { errorMessage: 'Publisher name field is required.' },
    },
  },
};

module.exports = bookSchema;
