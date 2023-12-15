const dayjs = require('dayjs');

const { DataBaseModelNames } = require('../../database/constants');
const db = require('../../database/models');
const Book = require('../../database/models')[DataBaseModelNames.BOOK];
const Category = require('../../database/models')[DataBaseModelNames.CATEGORY];
const Author = require('../../database/models')[DataBaseModelNames.AUTHOR];
const deleteFile = require('../../helpers/delete-file.helper');
const uploadFile = require('../../helpers/upload-file.helper');

const bookService = {
  index: async () => {
    try {
      const books = await Book.findAll({
        where: { deletedAt: null },
      });
      return {
        message: 'Retrieved all book lists successfully.',
        data: books,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  store: async (req) => {
    const t = await db.sequelize.transaction();
    try {
      const {
        title,
        categoryId,
        authorId,
        language,
        contentType,
        isbn,
        genre,
        publisher,
        publicationDate,
        summary,
        edition,
        totalPages,
      } = req.body;

      const formattedDate = dayjs(publicationDate).format('YYYY-MM-DD');

      const category = await Category.findByPk(categoryId, {
        where: { deletedAt: null, status: 1 },
      });

      if (!category) throw new Error('Invalid CategoryId');

      const author = await Author.findByPk(authorId, {
        where: { deletedAt: null },
      });
      if (!author) throw new Error('Invalid AuthorId');

      let book;
      if (req.file) {
        const result = await uploadFile.bookCover(req.file);
        if (result.$metadata.httpStatusCode !== 200) {
          throw new Error('Failed to upload book cover');
        }

        book = await Book.create(
          {
            title,
            categoryId,
            authorId,
            language,
            contentType,
            isbn,
            genre,
            publisher,
            publicationDate: formattedDate,
            coverImage: result.Key,
            coverImageUrl: result.Location,
            summary,
            edition,
            totalPages,
          },
          { transaction: t },
        );
      } else {
        book = await Book.create(
          {
            title,
            categoryId,
            authorId,
            language,
            contentType,
            isbn,
            genre,
            publisher,
            publicationDate: formattedDate,
            coverImage: null,
            coverImageUrl: null,
            summary,
            edition,
            totalPages,
          },
          { transaction: t },
        );
      }

      if (!book) {
        throw new Error('Failed to create book');
      }

      await t.commit();

      return {
        message: 'Book created successfully.',
        data: book,
      };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  },

  show: async (req) => {
    try {
      const book = await Book.findByPk(req.params.id, {
        where: { deletedAt: null },
      });
      if (!book) throw new Error('Book Not Found');

      return {
        message: 'Retrieved book details Successfully.',
        data: book,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (req) => {
    const t = await db.sequelize.transaction();
    try {
      const bookId = req.params.id;

      const {
        title,
        categoryId,
        authorId,
        language,
        contentType,
        isbn,
        genre,
        publisher,
        publicationDate,
        summary,
        edition,
        totalPages,
      } = req.body;

      const formattedDate = dayjs(publicationDate).format('YYYY-MM-DD');

      const bookToUpdate = await Book.findByPk(
        bookId,
        { where: { deletedAt: null } },
        { transaction: t },
      );

      if (!bookToUpdate) throw new Error('Book Not Found');

      const category = await Category.findByPk(
        categoryId,
        {
          where: { deletedAt: null, status: 1 },
        },
        { transaction: t },
      );

      if (!category) throw new Error('Invalid CategoryId');

      const author = await Author.findByPk(
        authorId,
        {
          where: { deletedAt: null },
        },
        { transaction: t },
      );
      if (!author) throw new Error('Invalid AuthorId');

      let updatedBook = bookToUpdate;
      if (req.file) {
        const result = await uploadFile.bookCover(req.file);

        if (result.$metadata.httpStatusCode !== 200) {
          throw new Error('Failed to upload brand image');
        }

        if (updatedBook.coverImage) {
          const deletionResult = await deleteFile(updatedBook.coverImage);
          if (
            deletionResult.DeleteMarker !== true ||
            deletionResult.$metadata.httpStatusCode !== 204
          ) {
            throw new Error('Error deleting subcategory image');
          }
        }

        updatedBook = await bookToUpdate.update(
          {
            title,
            categoryId,
            authorId,
            language,
            contentType,
            isbn,
            genre,
            publisher,
            publicationDate: formattedDate,
            coverImage: result.Key,
            coverImageUrl: result.Location,
            summary,
            edition,
            totalPages,
          },
          { transaction: t },
        );
      } else {
        updatedBook = await bookToUpdate.update(
          {
            title,
            categoryId,
            authorId,
            language,
            contentType,
            isbn,
            genre,
            publisher,
            publicationDate: formattedDate,
            summary,
            edition,
            totalPages,
          },
          { transaction: t },
        );
      }

      if (!updatedBook) throw new Error('Failed to update book');

      await t.commit();

      return {
        message: 'Book updated successfully',
        data: updatedBook,
      };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  },

  delete: async (req) => {
    const t = await db.sequelize.transaction();
    try {
      const book = await Book.findByPk(req.params.id, {
        where: { deletedAt: null },
      });

      if (!book) throw new Error('Book not found');

      const coverImage = book.coverImage;

      if (coverImage) {
        const deletionResult = await deleteFile(coverImage);
        if (
          deletionResult.DeleteMarker === true ||
          deletionResult.$metadata.httpStatusCode === 204
        ) {
          await book.update(
            { coverImage: null, coverImageUrl: null },
            { transaction: t },
          );
        } else {
          throw new Error('Error Deleting Brand');
        }
      }

      const result = await book.destroy({ transaction: t });

      if (!result) {
        throw new Error('Failed to delete book');
      }

      await t.commit();

      return {
        message: 'Book deleted successfully',
      };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  },
};

module.exports = bookService;
