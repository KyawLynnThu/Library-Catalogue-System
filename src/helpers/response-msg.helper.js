const responseMessage = (
  res,
  message = '',
  result,
  currentPage,
  totalPages,
  pageSize,
  totalCounts,
) => {
  const response = {
    isSuccess: true,
    message: message,
  };

  if (currentPage) {
    response.currentPage = currentPage;
  }

  if (totalPages) {
    response.totalPages = totalPages;
  }

  if (pageSize) {
    response.pageSize = pageSize;
  }

  if (totalCounts) {
    response.totalCounts = totalCounts;
  }

  if (result) {
    response.data = result;
  }

  res.status(200).json(response);
};

module.exports = responseMessage;
