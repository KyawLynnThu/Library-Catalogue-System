const router = require('express').Router();

const authController = require('../../../controllers/v1/auth.controller');
const adminAuthMiddleware = require('../../../middlewares/admin-auth.middleware');

router.post('/login', authController.logIn);
router.post('/logout', adminAuthMiddleware, authController.logOut);

module.exports = router;
