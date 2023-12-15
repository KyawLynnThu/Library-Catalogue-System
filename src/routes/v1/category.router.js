const router = require('express').Router();
const { checkSchema } = require('express-validator');

const categoryController = require('../../controllers/v1/category.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const categorySchema = require('../../schemas/v1/category.schema');

router
  .route('/')
  .get(adminAuthMiddleware, categoryController.index)
  .post(
    adminAuthMiddleware,
    checkSchema(categorySchema.create),
    validationMiddleware,
    categoryController.store,
  );

router
  .route('/:id')
  .get(adminAuthMiddleware, categoryController.show)
  .put(
    adminAuthMiddleware,
    checkSchema(categorySchema.create),
    validationMiddleware,
    categoryController.update,
  )
  .delete(adminAuthMiddleware, categoryController.destory);

module.exports = router;
