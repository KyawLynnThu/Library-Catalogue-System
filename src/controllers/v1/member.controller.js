const responseMessage = require('../../helpers/response-msg.helper');
const memberService = require('../../services/v1/member.service');

const memberController = {
  memberLists: async (req, res, next) => {
    memberService
      .memberLists(req)
      .then((data) => {
        responseMessage(
          res,
          data.message,
          data.data,
          data.currentPage,
          data.totalPages,
          data.pageSize,
          data.totalCounts,
        );
      })
      .catch((err) => {
        next(err);
      });
  },

  memberDetails: async (req, res, next) => {
    memberService
      .memberDetails(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  approvedByAdmin: async (req, res, next) => {
    memberService
      .approvedByAdmin(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  rejectedByAdmin: async (req, res, next) => {
    memberService
      .rejectedByAdmin(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  registerByUser: async (req, res, next) => {
    memberService
      .registerByUser(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  userLogIn: async (req, res, next) => {
    memberService
      .userLogIn(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },

  userLogOut: async (req, res, next) => {
    memberService
      .userLogOut(req)
      .then((data) => {
        responseMessage(res, data.message, data.data);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = memberController;
