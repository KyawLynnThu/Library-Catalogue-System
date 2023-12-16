const router = require('express').Router();

const authRoute = require('./auth.router');
const authorRoute = require('./author.router');
const bookRoute = require('./book.router');
const borrowRoute = require('./borrow.router');
const categoryRoute = require('./category.router');
const memberRoute = require('./member.router');

router.use('/admin', authRoute);
router.use('/admin/categories', categoryRoute);
router.use('/admin/authors', authorRoute);
router.use('/admin/books', bookRoute);
router.use('/admin/borrow', borrowRoute);
router.use('/admin/user', memberRoute);

router.use('/user', memberRoute);
router.use('/user/books', borrowRoute);

module.exports = router;
