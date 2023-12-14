const responseMessage = (res, message = '', result) => {
  const response = {
    isSuccess: true,
    message: message,
  };

  if (result) {
    response.data = result;
  }

  res.status(200).json(response);
};

module.exports = responseMessage;
