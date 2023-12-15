const router = require('express').Router();

const memberController = require('../../../controllers/v1/member.controller');
const adminAuthMiddleware = require('../../../middlewares/admin-auth.middleware');

router.post('/register', adminAuthMiddleware, memberController.registerByAdmin);
router.patch(
  '/approve/:memberId',
  adminAuthMiddleware,
  memberController.approvedByAdmin,
);
router.delete(
  '/reject/:memberId',
  adminAuthMiddleware,
  memberController.rejectedByAdmin,
);

module.exports = router;
