const { DataBaseModelNames } = require('../../database/constants');
const Member = require('../../database/models')[DataBaseModelNames.MEMBER];

const memberSchema = {
  register: {
    firstName: {
      notEmpty: { errorMessage: 'Fist name field is required.' },
    },
    lastName: {
      notEmpty: { errorMessage: 'Last name field is required.' },
    },
    email: {
      notEmpty: { errorMessage: 'Email field is required.' },
      isEmail: { errorMessage: 'Invalid email.' },
      custom: {
        options: (value) => {
          return Member.findOne({ where: { email: value } }).then((member) => {
            if (member) {
              throw new Error('E-mail already in used.');
            }
          });
        },
      },
    },
    password: {
      notEmpty: { errorMessage: 'Password field is required.' },
      isLength: {
        errorMessage: 'Password should be at least 7 chars long',
        options: { min: 7 },
      },
    },
    confirm_password: {
      notEmpty: true,
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match.');
          }
          return true;
        },
      },
    },
    address: {
      notEmpty: { errorMessage: 'Address field is required.' },
    },
    phone: {
      notEmpty: { errorMessage: 'Phone field is required.' },
      custom: {
        options: (value) => {
          return Member.findOne({ where: { phone: value } }).then((member) => {
            if (member) {
              throw new Error('Phone Number already in used.');
            }
          });
        },
      },
    },
    dob: {
      notEmpty: { errorMessage: 'Date of Birth field is required.' },
    },
  },

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

module.exports = memberSchema;
