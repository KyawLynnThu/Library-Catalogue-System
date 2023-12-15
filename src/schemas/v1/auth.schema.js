const authSchema = {
  login: {
    email: {
      notEmpty: { errorMessage: 'Email field is required.' },
      isEmail: { errorMessage: 'Invalid email.' },
    },
    password: {
      notEmpty: { errorMessage: 'Password field is required.' },
      isLength: {
        errorMessage: 'Password should be at least 7 chars long',
        options: { min: 7 },
      },
    },
  },
};

module.exports = authSchema;
