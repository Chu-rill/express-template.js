### **Backend README**

<!-- ```md -->

# Express Template JS

An Express.js project template to kickstart your Node.js applications with a basic setup.

## Features

**Express.js:** A minimalist web framework for Node.js.
**ESLint:** For linting JavaScript code.
**Pre-configured Routes:** Basic routing setup to get started with.
**Environment Variables:** Uses .env file for environment configuration.
**Nodemon:** For auto-restarting the server during development.

# Project Structure

```bash
express-template-js/
├── .env.example       # Example environment variables file
├── .gitignore         # Files to ignore in version control
├── package.json       # Project dependencies and scripts
├── routes/            # Folder for route definitions
│   └── index.js       # Basic route example
├── src/               # Main source folder
│   └── app.js         # Entry point for the Express app
├── public/            # Folder for static files (CSS, JS, Images)
├── views/             # Folder for template files (EJS)
└── README.md          # Project documentation
```

# Prerequisites

1. Node.js (v14 or higher)
2. NPM or Yarn

# Installation

1. Clone the repository:

```bash
git clone https://github.com/Chu-rill/express-template-js.git

```

2. Navigate to the project directory:

```bash
cd express-template-js
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file based on the .env.example:

```bash
cp .env.example .env
```

5. Start the development server:

```bash
npm run dev
```

# Usage

1. Open http://localhost:{PORT} in your browser to see the app running.
2. Customize routes by modifying files in the routes/ folder.

# Available Scripts

1. **npm start:** Starts the server in production mode.
2. **npm run dev:** Starts the server with Nodemon for auto-reloading during development.

# License

This project is licensed under the MIT License.
