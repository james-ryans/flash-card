# Flash Card Application

This is a Flash Card application built with NestJS, TypeScript, and Knex.js for the backend, and Vite JS for the frontend. The application allows users to create, manage, and study flash cards. It uses Redis for session management and bcrypt for password hashing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/james-ryans/flash-card.git
   cd flash-card
   ```

2. Install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Set up the database:

   ```bash
   npx knex migrate:latest
   npx knex seed:run
   ```

4. Start the backend server:

   ```bash
   npm run start:dev
   ```

### Frontend

1. Navigate to the web directory:

   ```bash
   cd ../web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. Use the application to create, manage, and study flash cards.

## Features

- User authentication and session management
- Create, edit, and delete flash cards
- Organize flash cards into decks
- Study mode with spaced repetition

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the `server` directory and copy the value from `.env.example` file.

## Scripts

### Backend

- `npm run start:dev`: Start the backend server in development mode
- `npm run build`: Build the backend for production
- `npm run start:prod`: Start the backend server in production mode

### Frontend

- `npm run dev`: Start the frontend server in development mode
- `npm run build`: Build the frontend for production
- `npm run serve`: Serve the built frontend

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

No License (especially this is not for commercial use).