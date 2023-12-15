const router = require('express').Router();
const { checkSchema } = require('express-validator');

const bookController = require('../../controllers/v1/book.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const uploadFileMiddleware = require('../../middlewares/upload-file.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const bookSchema = require('../../schemas/v1/book.schema');

router
  .route('/')
  .get(adminAuthMiddleware, bookController.index)
  .post(
    adminAuthMiddleware,
    uploadFileMiddleware.upload.single('book_cover'),
    checkSchema(bookSchema.create),
    validationMiddleware,
    bookController.store,
  );

router
  .route('/:id')
  .get(bookController.show)
  .put(
    adminAuthMiddleware,
    uploadFileMiddleware.upload.single('book_cover'),
    checkSchema(bookSchema.create),
    validationMiddleware,
    bookController.update,
  )
  .delete(adminAuthMiddleware, bookController.destory);

module.exports = router;
