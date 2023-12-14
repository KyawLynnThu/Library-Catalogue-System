const DataBaseTableNames = Object.freeze({
  ADMIN: 'admins',
  CATEGORY: 'categories',
  AUTHOR: 'authors',
  BOOK: 'books',
  AUTHOR_BOOK: 'author_books',
  BOOK_COPY: 'book_copies',
  STUDENT: 'students',
  BORROW_RECORD: 'borrow_records',
});

const DataBaseModelNames = Object.freeze({
  ADMIN: 'admin',
  CATEGORY: 'category',
  AUTHOR: 'author',
  BOOK: 'book',
  AUTHOR_BOOK: 'author_book',
  BOOK_COPY: 'book_copy',
  STUDENT: 'student',
  BORROW_RECORD: 'borrow_record',
});

module.exports = {
  DataBaseTableNames,
  DataBaseModelNames,
};
