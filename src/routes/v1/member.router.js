const router = require('express').Router();
const { checkSchema } = require('express-validator');

const memberController = require('../../controllers/v1/member.controller');
const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const validationMiddleware = require('../../middlewares/validation.middleware');
const memberSchema = require('../../schemas/v1/member.schema');

router.post(
  '/register',
  checkSchema(memberSchema.register),
  validationMiddleware,
  memberController.registerByUser,
);
router.post(
  '/login',
  checkSchema(memberSchema.login),
  validationMiddleware,
  memberController.userLogIn,
);
router.post('/logout', memberController.userLogOut);

router.patch(
  '/:memberId/approve',
  adminAuthMiddleware,
  memberController.approvedByAdmin,
);
router.delete(
  '/:memberId/reject',
  adminAuthMiddleware,
  memberController.rejectedByAdmin,
);

module.exports = router;
