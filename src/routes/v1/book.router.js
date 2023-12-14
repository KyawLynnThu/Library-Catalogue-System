const router = require('express').Router();

const bookController = require('../../controllers/v1/book.controller');

router.route('/').get(bookController.index).post(bookController.store);

router
  .route('/:id')
  .get(bookController.show)
  .put(bookController.update)
  .delete(bookController.destory);

module.exports = router;
