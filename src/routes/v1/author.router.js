const router = require('express').Router();

const authorController = require('../../controllers/v1/author.controller');

router.route('/').get(authorController.index).post(authorController.store);

router
  .route('/:id')
  .get(authorController.show)
  .put(authorController.update)
  .delete(authorController.destory);

module.exports = router;
