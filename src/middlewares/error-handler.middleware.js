const errorMiddleware = (err, _req, res, _next) => {
  const errorMessage = err.message.startsWith('Error: ')
    ? err.message.slice(7) // Remove the "Error: " prefix
    : err.message;

  if (err.statusCode) {
    res.status(err.statusCode).json({
      isSuccess: false,
      message: errorMessage,
    });
  } else {
    res.json({
      isSuccess: false,
      message: errorMessage,
    });
  }
};

module.exports = errorMiddleware;
