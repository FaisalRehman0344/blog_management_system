# Node.js Backend with JWT Authentication

This project is a Node.js backend application featuring JWT (JSON Web Token) authentication. It provides secure user authentication, token generation, and token verification mechanisms.

## Features

- JWT-based authentication  
- Access and refresh token system  
- MongoDB database integration  
- Blog Management System

## Project Structure

src/\
├── controllers/ # Route controllers (API logic)\
├── middlewares/ # Custom express middlewares\
├── models/ # MongoDB models (Mongoose schemas)\
├── routes/ # API route definitions\
├── services/ # Business logic and service layer\
├── utils/ # Utility classes and functions\
├── config/ # Configuration files\
├── validations/ # Request validation schemas\
├── app.js # Express application setup\
└── index.js # Server entry point


## Environment Variables

The application requires the following environment variables configured in a `.env` file:

### Database Configuration
- `MONGODB_URL=mongodb://admin:secret@localhost:27017`  
  - MongoDB connection URL  
  - Format: `mongodb://<username>:<password>@<host>:<port>`  

### JWT Configuration
- `JWT_SECRET=thisisasamplesecret`  
  - Secret key used to sign JWT tokens  
  - **Important**: Replace with a strong, random string in production  

- `JWT_ACCESS_EXPIRATION_MINUTES=30`  
  - Expiration time for access tokens (in minutes)  
  - After this time, users must refresh their token  

- `JWT_REFRESH_EXPIRATION_DAYS=30`  
  - Expiration time for refresh tokens (in days)  
  - Longer-lived token used to obtain new access tokens  

- `JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10`  
  - Expiration time for password reset tokens (in minutes)  
  - Security measure for temporary password reset links  

- `JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10`  
  - Expiration time for email verification tokens (in minutes)  
  - Time limit for users to verify their email address  

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file based on the provided example
4. Start the server with `npm start`

## API Documentation

### Postman Collection
The project includes a ready-to-use Postman collection for testing all API endpoints:  
`Blog Management.postman_collection.json`

**To use the collection:**
1. Import the collection into Postman
2. Set up your environment variables in Postman:
   - `baseUrl`: Your server address (e.g., `http://localhost:3000`)
   - `accessToken`: Your access token you get from login API
3. Start testing the endpoints

**Collection includes:**
- Authentication routes (login, register, refresh token)
- Blog post CRUD operations

For detailed endpoint documentation, refer to the description in each request within the Postman collection.