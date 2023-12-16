# Library Catalogue System

This README file provides an overview of Library Catalogue System API. Tech Stacks: NodeJS, Express, MySQL with Sequelize ORM. Can find system ERD, WorkFlow & Postman collection at root Dir.

## Features

- **Admin Operations:**
  - Authentication (Login/Logout)
  - Management of categories, authors, and books
  - Borrowing/Retun actions for members
  - Search member data
  - Search book by search and filter (by books, by category, by author, by catalogueId)
  - User approval/rejection
  
- **User Operations:**
  - User registration, login, and logout
  - Search and book reservation

## Setup

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KyawLynnThu/Library-Catalogue-System.git
   cd project_directory

2. **Install Dependencies:**
   ```bash
   npm install

3. **Environment Configuration:**
    ```bash
    Duplicate `.env-example` to `.env`
    Fill in necessary credentials and configurations in the `.env` file.

4. **Database Setup:**
    ```bash
    Connect to your MySQL database.
    Run the following command to create the database:
    npm run create:db

5. **Database Migration:**
    ```bash
    To execute migration: npm run migrate:up
    To undo migration: npm run migrate:down

6. **Data Seeding:**
    ```bash
    To seed initial data: npm run seed
    To undo data seeding: npm run unseed

7. **Running the Project:**
    ```bash
    For production: npm start
    For development: npm run dev

# API Endpoints

This document outlines the API endpoints available in the application.

## Admin Related Endpoints

- `/api/v1/admin/login`: Admin login
- `/api/v1/admin/logout`: Admin logout
- `/api/v1/admin/categories`: Operations related to categories
- `/api/v1/admin/authors`: Operations related to authors
- `/api/v1/admin/books`: Operations related to books
- `/api/v1/admin/borrow/:memberId/book`: Borrowing books by a member
- `/api/v1/admin/borrow/:memberId/return`: Returning books by a member
- `/api/v1/admin/user/:memberId/approve`: Approving a user
- `/api/v1/admin/user/:memberId/reject`: Rejecting a user
- `/api/v1/admin/user`: User Lists
- `/api/v1/admin/user/:memberId`: User Details


## User Related Endpoints

- `/api/v1/user/register`: User registration
- `/api/v1/user/login`: User login
- `/api/v1/user/logout`: User logout
- `/api/v1/user/books/search`: Searching functionality
- `/api/v1/user/books/reserve`: Booking functionality

## License

[MIT](https://choosealicense.com/licenses/mit/)