const router = require('express').Router();

const authRoute = require('./auth.router');
const authorRoute = require('./author.router');
const bookRoute = require('./book.router');
const categoryRoute = require('./category.router');

router.use('/auth/admin', authRoute);
router.use('/categories', categoryRoute);
router.use('/authors', authorRoute);
router.use('/books', bookRoute);

module.exports = router;
