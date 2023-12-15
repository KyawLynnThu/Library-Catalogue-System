const router = require('express').Router();

const borrowController = require('../../../controllers/v1/borrow.controller');

router.post('/book/:memberId', borrowController.borrowBook);
router.post('/book/return/:memberId', borrowController.returnBook);

module.exports = router;
