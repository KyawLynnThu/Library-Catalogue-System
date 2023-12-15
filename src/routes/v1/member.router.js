const router = require('express').Router();

const memberController = require('../../controllers/v1/member.controller');

router.post('/register', memberController.registerByUser);
router.post('/login', memberController.userLogIn);
router.post('/logout', memberController.userLogOut);

module.exports = router;
