const DataBaseTableNames = Object.freeze({
  ADMIN: 'admins',
  CATEGORY: 'categories',
  AUTHOR: 'authors',
  BOOK: 'books',
  BOOK_COPY: 'book_copies',
  STUDENT: 'students',
  BORROW_RECORD: 'borrow_records',
});

const DataBaseModelNames = Object.freeze({
  ADMIN: 'admin',
  CATEGORY: 'category',
  AUTHOR: 'author',
  BOOK: 'book',
  BOOK_COPY: 'book_copy',
  STUDENT: 'student',
  BORROW_RECORD: 'borrow_record',
});

module.exports = {
  DataBaseTableNames,
  DataBaseModelNames,
};
