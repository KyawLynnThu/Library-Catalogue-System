const responseMessage = require('../../helpers/response-msg.helper');
const borrowService = require('../../services/v1/borrow.service');

const borrowController = {
  borrowBook: async (req, res, next) => {
    borrowService
      .borrowBook(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  returnBook: async (req, res, next) => {
    borrowService
      .returnBook(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  reserveBook: async (req, res, next) => {
    borrowService
      .reserveBook(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = borrowController;
