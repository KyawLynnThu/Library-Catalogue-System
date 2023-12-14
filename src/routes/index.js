const router = require('express').Router();

const versionOne = require('./v1/index');

/* Version 1 Routes */
router.use('/v1', versionOne);

module.exports = router;
