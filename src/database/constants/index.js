const DataBaseTableNames = Object.freeze({
  ADMIN: 'admins',
  CATEGORY: 'categories',
  AUTHOR: 'authors',
  BOOK: 'books',
  BOOK_COPY: 'book_copies',
  MEMBER: 'members',
  BORROW_RECORD: 'borrow_records',
});

const DataBaseModelNames = Object.freeze({
  ADMIN: 'admin',
  CATEGORY: 'category',
  AUTHOR: 'author',
  BOOK: 'book',
  BOOK_COPY: 'book_copy',
  MEMBER: 'member',
  BORROW_RECORD: 'borrow_record',
});

module.exports = {
  DataBaseTableNames,
  DataBaseModelNames,
};
