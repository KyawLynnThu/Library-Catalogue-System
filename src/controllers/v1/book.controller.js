const responseMessage = require('../../helpers/response-msg.helper');
const bookService = require('../../services/v1/book.service');

const bookController = {
  index: async (req, res, next) => {
    bookService
      .index(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  store: async (req, res, next) => {
    bookService
      .store(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  show: async (req, res, next) => {
    bookService
      .show(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  update: async (req, res, next) => {
    bookService
      .update(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  destory: async (req, res, next) => {
    bookService
      .delete(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = bookController;
