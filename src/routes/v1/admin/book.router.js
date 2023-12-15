const router = require('express').Router();

const bookController = require('../../../controllers/v1/book.controller');
const uploadFileMiddleware = require('../../../middlewares/upload-file.middleware');

router
  .route('/')
  .get(bookController.index)
  .post(uploadFileMiddleware.upload.single('book_cover'), bookController.store);

router
  .route('/:id')
  .get(bookController.show)
  .put(uploadFileMiddleware.upload.single('book_cover'), bookController.update)
  .delete(bookController.destory);

module.exports = router;
