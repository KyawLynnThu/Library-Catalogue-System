require('dotenv').config();

const { DataBaseModelNames } = require('../../database/constants');
const Member = require('../../database/models')[DataBaseModelNames.MEMBER];
const Book = require('../../database/models')[DataBaseModelNames.BOOK];
const BookReserve = require('../../database/models')[
  DataBaseModelNames.BOOK_RESERVE
];
const BorrowRecord = require('../../database/models')[
  DataBaseModelNames.BORROW_RECORD
];

const borrowService = {
  borrowBook: async (req) => {
    try {
      const { memberId } = req.params;
      const { bookIds } = req.body;

      const member = await Member.findByPk(memberId, {
        where: { deletedAt: null, accountStatus: 'ACTIVATED' },
      });
      if (!member) {
        throw new Error('There is no user with that Id.');
      }

      // Get the number of books the user has already borrowed and not returned
      const borrowedBooks = await BorrowRecord.findAll({
        where: { memberId, returnDate: null },
        attributes: ['id'],
      });

      const alreadyBorrowedBookIds = borrowedBooks.map((borrow) => borrow.id);

      // Check if any of the requested books are already borrowed by the user
      const duplicateBooks = bookIds.filter((bookId) =>
        alreadyBorrowedBookIds.includes(bookId),
      );

      if (duplicateBooks.length > 0) {
        throw new Error(
          'User has already borrowed one or more requested books',
        );
      }

      // Get the number of books the user has already borrowed
      const borrowedCount = await BorrowRecord.count({
        where: { memberId, returnDate: null },
      });

      // Calculate the number of additional books the user can borrow
      const remainingSlots = 5 - borrowedCount;
      if (remainingSlots <= 0) {
        throw new Error('User has reached maximum borrowing limit');
      }

      // Check Availability of books
      const books = await Book.findAll({
        where: { id: bookIds, availability: true, deletedAt: null },
      });

      if (books.length !== bookIds.length) {
        throw new Error('One or more books not available or do not exist');
      }

      // Check if the user is trying to borrow more books than allowed
      if (bookIds.length > remainingSlots) {
        throw new Error(`User can borrow up to ${remainingSlots} more books`);
      }

      // Create borrowing records for each book
      const currentDate = new Date();
      const dueDate = new Date(
        currentDate.getTime() + 14 * 24 * 60 * 60 * 1000,
      ); // 14 days borrowing time

      const borrowingRecords = bookIds.map((bookId) => ({
        memberId,
        bookId: bookId,
        borrowDate: currentDate,
        dueDate: dueDate,
      }));

      await BorrowRecord.bulkCreate(borrowingRecords);

      // Update book availability for all borrowed books
      await Book.update({ availability: false }, { where: { id: bookIds } });

      return {
        message: 'Books successfully borrowed',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  returnBook: async (req) => {
    try {
      const { memberId } = req.params;
      const { bookIds } = req.body;

      const member = await Member.findByPk(memberId, {
        where: { deletedAt: null, accountStatus: 'ACTIVATED' },
      });
      if (!member) {
        throw new Error('There is no user with that Id.');
      }

      // Check if the user has borrowed the books to be returned
      const borrowedBooks = await BorrowRecord.findAll({
        where: {
          memberId,
          bookId: bookIds,
          returnDate: null, // Ensure books haven't been returned already
        },
      });

      if (borrowedBooks.length !== bookIds.length) {
        throw new Error('One or more books not found or already returned');
      }

      // Update borrowing records with return dates
      const currentDate = new Date();
      await BorrowRecord.update(
        { returnDate: currentDate },
        { where: { memberId, bookId: bookIds, returnDate: null } },
      );

      // Update book availability for the returned books
      await Book.update({ availability: true }, { where: { id: bookIds } });

      return {
        message: 'Books successfully returned',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  reserveBook: async (req) => {
    try {
      const memberId = req.memberId;
      const { bookIds } = req.body;

      const books = await Book.findAll({
        where: {
          id: bookIds,
          availability: true,
          deletedAt: null,
        },
      });

      if (books.length !== bookIds.length) {
        throw new Error(
          'One or more books not found or are not available for reservation',
        );
      }

      // Check if the user has already reserved any of the requested books
      const existingReservations = await BookReserve.findAll({
        where: { memberId, bookId: bookIds, isAvailable: false },
      });

      if (existingReservations.length > 0) {
        throw new Error(
          'User has already reserved one or more of the requested books',
        );
      }

      // Create reservation records for each book
      const reservationRecords = bookIds.map((bookId) => ({
        memberId,
        bookId: bookId,
        isAvailable: false, // Mark the books as reserved
      }));

      await BookReserve.bulkCreate(reservationRecords);

      return {
        message: 'Books successfully reserved.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
module.exports = borrowService;
