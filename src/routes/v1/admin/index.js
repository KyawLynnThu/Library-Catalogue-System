const router = require('express').Router();

const authRoute = require('./auth.router');
const authorRoute = require('./author.router');
const bookRoute = require('./book.router');
const borrowRoute = require('./borrow.router');
const categoryRoute = require('./category.router');
const memberRoute = require('./member.router');

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/authors', authorRoute);
router.use('/books', bookRoute);
router.use('/members', memberRoute);
router.use('/borrow', borrowRoute);

module.exports = router;
