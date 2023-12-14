const responseMessage = require('../../helpers/response-msg.helper');
const authorService = require('../../services/v1/author.service');

const authorController = {
  index: async (req, res, next) => {
    authorService
      .index(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  store: async (req, res, next) => {
    authorService
      .store(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  show: async (req, res, next) => {
    authorService
      .show(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  update: async (req, res, next) => {
    authorService
      .update(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  destory: async (req, res, next) => {
    authorService
      .delete(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = authorController;
