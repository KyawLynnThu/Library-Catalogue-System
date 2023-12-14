const { validationResult } = require('express-validator');

const responseMessage = require('../../helpers/response-msg.helper');
const authService = require('../../services/v1/auth.service');

const authController = {
  logIn: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Validation Error',
        errors: errors.array(),
      });
    }

    authService
      .logIn(req.body)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  logOut: async (req, res, next) => {
    authService
      .logOut(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = authController;
