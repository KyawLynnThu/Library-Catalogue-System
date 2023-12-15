const authorSchema = {
  create: {
    authorName: {
      notEmpty: { errorMessage: 'Author name field is required.' },
    },
    birthDate: {
      notEmpty: { errorMessage: 'BirthDate field is required.' },
    },
    biography: {
      notEmpty: { errorMessage: 'Biography field is required.' },
    },
  },
};

module.exports = authorSchema;
