const responseMessage = require('../../helpers/response-msg.helper');
const authService = require('../../services/v1/auth.service');

const authController = {
  logIn: async (req, res, next) => {
    authService
      .logIn(req)
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
