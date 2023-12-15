const router = require('express').Router();
const { checkSchema } = require('express-validator');

const borrowController = require('../../controllers/v1/borrow.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const memberAuthMiddleware = require('../../middlewares/member-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const borrowSchema = require('../../schemas/v1/borrow.schema');

router.post(
  '/book/:memberId',
  adminAuthMiddleware,
  checkSchema(borrowSchema.borrowBook),
  validationMiddleware,
  borrowController.borrowBook,
);

router.post(
  '/book/return/:memberId',
  adminAuthMiddleware,
  checkSchema(borrowSchema.borrowBook),
  validationMiddleware,
  borrowController.returnBook,
);
router.post(
  '/book',
  memberAuthMiddleware,
  checkSchema(borrowSchema.borrowBook),
  validationMiddleware,
  borrowController.reserveBook,
);

module.exports = router;
