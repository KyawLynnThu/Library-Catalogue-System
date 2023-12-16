const dayjs = require('dayjs');
const { QueryTypes } = require('sequelize');

const { DataBaseModelNames } = require('../../database/constants');
const db = require('../../database/models');
const Book = require('../../database/models')[DataBaseModelNames.BOOK];
const Category = require('../../database/models')[DataBaseModelNames.CATEGORY];
const Author = require('../../database/models')[DataBaseModelNames.AUTHOR];
const deleteFile = require('../../helpers/delete-file.helper');
const uploadFile = require('../../helpers/upload-file.helper');

const bookService = {
  index: async (req) => {
    try {
      let query = `
        SELECT 
          books.id AS bookId,
          books.title AS bookTitle,
          books.cover_image_url,
          books.availability,
          books.isbn,
          categories.id AS categoryId,
          categories.category_name,
          authors.id AS authorId,
          authors.author_name
        FROM books
        LEFT JOIN categories ON books.category_id = categories.id AND categories.deleted_at IS NULL
        LEFT JOIN authors ON books.author_id = authors.id AND authors.deleted_at IS NULL
        WHERE books.deleted_at IS NULL
      `;

      let countQuery = `
        SELECT COUNT(*) AS total 
        FROM books
        LEFT JOIN categories ON books.category_id = categories.id AND categories.deleted_at IS NULL
        LEFT JOIN authors ON books.author_id = authors.id AND authors.deleted_at IS NULL
        WHERE books.deleted_at IS NULL
      `;

      if (req.query.keyword) {
        const keyword = req.query.keyword;
        query += ` AND (books.title LIKE '%${keyword}%' OR authors.author_name LIKE '%${keyword}%' OR categories.category_name LIKE '%${keyword}%')`;
        countQuery += ` AND (books.title LIKE '%${keyword}%' OR authors.author_name LIKE '%${keyword}%' OR categories.category_name LIKE '%${keyword}%')`;
      }

      let filterConditions = [];

      if (req.query.book) {
        filterConditions.push(`books.title LIKE '%${req.query.book}%'`);
      }

      if (req.query.category) {
        filterConditions.push(
          `categories.category_name LIKE '%${req.query.category}%'`,
        );
      }

      if (req.query.author) {
        filterConditions.push(
          `authors.author_name LIKE '%${req.query.author}%'`,
        );
      }

      if (req.query.catalogueId) {
        filterConditions.push(`books.category_id = ${req.query.catalogueId}`);
      }

      if (filterConditions.length > 0) {
        query += ` AND (${filterConditions.join(' AND ')})`;
        countQuery += ` AND (${filterConditions.join(' AND ')})`;
      }

      const totalCount = await db.sequelize.query(countQuery, {
        type: QueryTypes.SELECT,
        plain: true,
      });

      let page = parseInt(req.query.page, 10) || 1;
      let pageSize = parseInt(req.query.pageSize, 10) || 10;

      if (req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize, 10);
      }

      let offset = (page - 1) * pageSize;
      query += ` ORDER BY books.created_at DESC LIMIT ${pageSize} OFFSET ${offset}`;

      const books = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        nest: true,
      });

      const totalPages = Math.ceil(totalCount.total / pageSize);

      return {
        message: 'Retrieved all book lists successfully.',
        currentPage: page,
        totalPages: totalPages,
        pageSize: pageSize,
        totalCounts: totalCount.total,
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
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'categoryName'],
          },
          {
            model: Author,
            as: 'author',
            attributes: ['id', 'authorName'],
          },
        ],
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
