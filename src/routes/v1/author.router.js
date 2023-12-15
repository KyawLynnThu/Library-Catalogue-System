const router = require('express').Router();
const { checkSchema } = require('express-validator');

const authorController = require('../../controllers/v1/author.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authorSchema = require('../../schemas/v1/author.schema');

router
  .route('/')
  .get(adminAuthMiddleware, authorController.index)
  .post(
    adminAuthMiddleware,
    checkSchema(authorSchema.create),
    validationMiddleware,
    authorController.store,
  );

router
  .route('/:id')
  .get(adminAuthMiddleware, authorController.show)
  .put(
    adminAuthMiddleware,
    checkSchema(authorSchema.create),
    validationMiddleware,
    authorController.update,
  )
  .delete(adminAuthMiddleware, authorController.destory);

module.exports = router;
