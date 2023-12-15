# Library Catalogue System

This README file provides an overview of Library Catalogue System API. Tech Stacks: NodeJS, Express, MySQL with Sequelize ORM.

## Features

- **Admin Operations:**
  - Authentication (Login/Logout)
  - Management of categories, authors, and books
  - Borrowing actions for members
  - Search member data
  - Search book by filter (by books, by category, by author)
  - User approval/rejection
  
- **User Operations:**
  - User registration, login, and logout
  - Search and book reservation

## Setup

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KyawLynnThu/Library-Catalogue-System.git

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

## User Related Endpoints

- `/api/v1/user/register`: User registration
- `/api/v1/user/login`: User login
- `/api/v1/user/logout`: User logout
- `/api/v1/search`: Searching functionality
- `/api/v1/reserve/book`: Booking functionality
