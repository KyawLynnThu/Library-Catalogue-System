const router = require('express').Router();

const authorController = require('../../../controllers/v1/author.controller');
const adminAuthMiddleware = require('../../../middlewares/admin-auth.middleware');

router
  .route('/')
  .get(authorController.index)
  .post(adminAuthMiddleware, authorController.store);

router
  .route('/:id')
  .get(authorController.show)
  .put(adminAuthMiddleware, authorController.update)
  .delete(adminAuthMiddleware, authorController.destory);

module.exports = router;
