const router = require('express').Router();
const { checkSchema } = require('express-validator');

const authController = require('../../controllers/v1/auth.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authSchema = require('../../schemas/v1/auth.schema');

router.post(
  '/login',
  checkSchema(authSchema.login),
  validationMiddleware,
  authController.logIn,
);
router.post('/logout', adminAuthMiddleware, authController.logOut);

module.exports = router;
