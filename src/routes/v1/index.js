const router = require('express').Router();

const adminRoute = require('./admin');
const memberRoute = require('./member.router');

router.use('/admin', adminRoute);
router.use('/member', memberRoute);

module.exports = router;
