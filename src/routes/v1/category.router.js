const router = require('express').Router();

const categoryController = require('../../controllers/v1/category.controller');

router.route('/').get(categoryController.index).post(categoryController.store);

router
  .route('/:id')
  .get(categoryController.show)
  .put(categoryController.update)
  .delete(categoryController.destory);

module.exports = router;
