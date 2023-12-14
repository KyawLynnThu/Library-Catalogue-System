const router = require('express').Router();

const authController = require('../../controllers/v1/auth.controller');

router.post('/login', authController.logIn);
router.post('/logout', authController.logOut);

module.exports = router;
