const router = require('express').Router();
const { checkSchema } = require('express-validator');

const borrowController = require('../../controllers/v1/borrow.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const memberAuthMiddleware = require('../../middlewares/member-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');

router.post(
  '/book/:memberId',
  adminAuthMiddleware,
  checkSchema(),
  validationMiddleware,
  borrowController.borrowBook,
);
router.post(
  '/book/return/:memberId',
  adminAuthMiddleware,
  checkSchema(),
  validationMiddleware,
  borrowController.returnBook,
);
router.post(
  '/book',
  memberAuthMiddleware,
  checkSchema(),
  validationMiddleware,
  borrowController.reserveBook,
);

module.exports = router;
