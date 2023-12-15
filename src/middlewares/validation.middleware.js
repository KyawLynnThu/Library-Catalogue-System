const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Validation Error',
      errors: errors.array(),
    });
  }
  next(); // Move to the next middleware if validation passes
};

module.exports = validationMiddleware;
