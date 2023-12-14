const { validationResult } = require('express-validator');

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Validation Error',
      errors: errors.array(),
    });
  }
  next(); // Proceed to the next middleware
};

module.exports = handleValidationResult;
