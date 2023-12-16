const router = require('express').Router();
const { checkSchema } = require('express-validator');

const bookController = require('../../controllers/v1/book.controller');
const borrowController = require('../../controllers/v1/borrow.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const memberAuthMiddleware = require('../../middlewares/member-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const borrowSchema = require('../../schemas/v1/borrow.schema');

// Admin Operation
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

// User Operation
router.get('/search', bookController.index);

router.post(
  '/reserve',
  memberAuthMiddleware,
  checkSchema(borrowSchema.borrowBook),
  validationMiddleware,
  borrowController.reserveBook,
);

module.exports = router;
