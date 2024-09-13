### **Backend README**

<!-- ```md -->

# Trivio Backend

This is the backend for **Trivio**, a fullstack quiz application. The backend handles user authentication, quiz creation, leaderboard tracking, and more. It exposes a RESTful API consumed by the frontend.

## Features

- User authentication with JWT.
- Quiz creation with various categories.
- High score tracking and leaderboard.
- Filtering and pagination of quizzes.
- Secure API endpoints with data validation.

## Tech Stack

- **Express.js** - Backend framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Joi** - Data validation

## Installation

1. Clone the backend repository:
   ```bash
   git clone https://github.com/username/trivio-backend.git
   cd trivio-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following environment variables:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PORT=your-port-address
   JWT_LIFETIME=lifetime-of-jwt_token
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. The backend API will run at PORT in your .env.

# Deployment

The backend is hosted on Render. You can find the frontend for Trivio [here](https://github.com/Chu-rill/Quiz_app).

# Project Structure

```bash
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controllers
│   │   ├── auth_controller.js
│   │   ├── leaderboard_controller.js
│   │   └── quiz_controller.js
│   ├── error
│   │   └── error.js
│   ├── logic
│   │   ├── auth_logic.js
│   │   ├── leaderboard_logic.js
│   │   └── quiz_logic.js
│   ├── middleWare
│   │   ├── jwt.js
│   │   └── query_validation.js
│   ├── models
│   │   ├── leaderboard_model.js
│   │   ├── profileImages.js
│   │   ├── quiz_model.js
│   │   └── user_model.js
│   ├── routes
│   │   ├── auth_routes.js
│   │   ├── leaderboard_routes.js
│   │   └── quiz_routes.js
│   └── utils
│       ├── db.js
│       └── encryption.js
└── vercel.json
```

# Contributing

Contributions are welcome. Fork the repository, make changes, and submit a pull request.
