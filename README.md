# E-commerce Backend

This is an e-commerce backend built with Node.js, Express.js, Sequelize, and MySQL.

I built this project to practice backend development and learn how different parts of an e-commerce application work together.

It includes authentication and authorization, products and categories, cart and orders, database relationships, transactions, validation, and a basic payment flow.

I'm continuing to improve the project as I learn more about backend development.

## Features

* User registration and login
* JWT authentication and authorization
* Admin role management
* Product and category management
* Cart and cart item management
* Order and order item management
* Database relationships with Sequelize
* Transactions for order creation and cancellation
* Payment flow
* Input validation
* Pagination, search, filtering, and sorting
* Centralized error handling

## Tech Stack

* **Node.js**
* **Express.js**
* **Sequelize**
* **MySQL**
* **JWT**
* **bcrypt**
* **express-validator**
* **Git & GitHub**

## Project Structure

text
src/
├── config/
│   └── database.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── cartItem.controller.js
│   ├── category.controller.js
│   ├── order.controller.js
│   ├── payment.controller.js
│   └── product.controller.js
│
├── middleware/
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── Models/
│   ├── Cart.model.js
│   ├── cartItem.model.js
│   ├── category.model.js
│   ├── index.js
│   ├── order.model.js
│   ├── orderItem.model.js
│   ├── payment.model.js
│   ├── Product.model.js
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── Cart.routes.js
│   ├── Cartitem.routes.js
│   ├── category.routes.js
│   ├── order.routes.js
│   ├── payment.routes.js
│   └── product.routes.js
│
├── Validation/
│   ├── cartItem.validation.js
│   ├── category.validation.js
│   ├── order.validation.js
│   ├── payment.validation.js
│   ├── product.validation.js
│   ├── productQuery.validation.js
│   └── user.validation.js
│
├── app.js
└── server.js


## Database Relationships

The project uses Sequelize associations to connect the main entities.

* A **User** has one **Cart**
* A **Cart** has many **CartItems**
* A **User** has many **Orders**
* An **Order** has many **OrderItems**
* A **Product** belongs to a **Category**
* A **Category** has many **Products**
* A **Product** has many **CartItems**
* A **Product** has many **OrderItems**
* An **Order** has one **Payment**

Foreign keys are used to connect related records in the database.

## Authentication & Authorization

The project uses JWT for user authentication.

Users can register and log in using their email and password. Passwords are hashed with bcrypt before being stored in the database.

Authenticated requests use a JWT token to identify the current user.

The project also has role-based access control for admin-only routes, such as managing products, categories, and orders.

## API Endpoints

### Authentication

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| POST   | `/api/auth/register` | Public |
| POST   | `/api/auth/login`    | Public |

### Products

| Method | Endpoint        | Access |
| ------ | --------------- | ------ |
| GET    | `/products`     | Public |
| GET    | `/products/:id` | Public |
| POST   | `/products`     | Admin  |
| PUT    | `/products/:id` | Admin  |
| DELETE | `/products/:id` | Admin  |

The products endpoint also supports pagination, search, filtering, and sorting.

### Categories

| Method | Endpoint        | Access |
| ------ | --------------- | ------ |
| GET    | `/category`     | Public |
| GET    | `/category/:id` | Public |
| POST   | `/category`     | Admin  |
| PUT    | `/category/:id` | Admin  |
| DELETE | `/category/:id` | Admin  |

### Cart

| Method | Endpoint | Access        |
| ------ | -------- | ------------- |
| POST   | `/cart`  | Authenticated |
| GET    | `/cart`  | Authenticated |

### Cart Items

| Method | Endpoint          | Access        |
| ------ | ----------------- | ------------- |
| POST   | `/cart-items`     | Authenticated |
| GET    | `/cart-items`     | Authenticated |
| PUT    | `/cart-items/:id` | Authenticated |
| DELETE | `/cart-items/:id` | Authenticated |

### Orders

| Method | Endpoint            | Access        |
| ------ | ------------------- | ------------- |
| POST   | `/order`            | Authenticated |
| GET    | `/order`            | Authenticated |
| GET    | `/order/:id`        | Authenticated |
| PUT    | `/order/:id/cancel` | Authenticated |
| GET    | `/order/all`        | Admin         |
| PUT    | `/order/:id/status` | Admin         |

### Payment

| Method | Endpoint          | Access        |
| ------ | ----------------- | ------------- |
| POST   | `/payment/:id`    | Authenticated |
| POST   | `/payment/verify` | Authenticated |

## Installation & Setup

### 1. Clone the repository

bash
git clone https://github.com/panahpanahi17/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your database and JWT configuration.

Example:

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=ecommerce_db
DB_PORT=3306

JWT_SECRET=your_jwt_secret


Do not commit your `.env` file to GitHub.

### 4. Create the database

Create a MySQL database with the same name you used in your `.env` file.

### 5. Start the project

For development:

bash
npm run dev


The server will run on:

text
http://localhost:3000


## Environment Variables

The project uses environment variables for database and authentication settings.

The following variables are required:

* `DB_HOST`
* `DB_USER`
* `DB_PASSWORD`
* `DB_NAME`
* `DB_PORT`
* `JWT_SECRET`

Make sure the `.env` file is included in `.gitignore` and is not committed to the repository.

## Future Improvements

Some things I plan to improve in the future:

* Connect the payment flow to a real payment gateway
* Add more automated tests
* Improve the API documentation
* Continue improving the project structure and code quality
* Continue improving security
