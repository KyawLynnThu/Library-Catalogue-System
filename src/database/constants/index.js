const DataBaseTableNames = Object.freeze({
  ADMIN: 'admins',
  CATEGORY: 'categories',
  AUTHOR: 'authors',
  BOOK: 'books',
  MEMBER: 'members',
  BORROW_RECORD: 'borrow_records',
  BOOK_RESERVE: 'book_reserves',
});

const DataBaseModelNames = Object.freeze({
  ADMIN: 'admin',
  CATEGORY: 'category',
  AUTHOR: 'author',
  BOOK: 'book',
  MEMBER: 'member',
  BORROW_RECORD: 'borrow_record',
  BOOK_RESERVE: 'book_reserve',
});

module.exports = {
  DataBaseTableNames,
  DataBaseModelNames,
};
