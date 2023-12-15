const router = require('express').Router();

const categoryController = require('../../../controllers/v1/category.controller');
const adminAuthMiddleware = require('../../../middlewares/admin-auth.middleware');

router
  .route('/')
  .get(categoryController.index)
  .post(adminAuthMiddleware, categoryController.store);

router
  .route('/:id')
  .get(categoryController.show)
  .put(adminAuthMiddleware, categoryController.update)
  .delete(adminAuthMiddleware, categoryController.destory);

module.exports = router;
