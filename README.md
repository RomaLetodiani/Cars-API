
# Cars API

This is a simple Express.js project for managing cars information using a RESTful API.

## Features

- Allows CRUD operations (Create, Read, Update, Delete) for cars.
- Uses Express.js for handling HTTP requests.
- Utilizes a JSON file for storing car data.
- Provides a basic configuration setup using a config file.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RomaLetodiani/Cars-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Cars-API
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

- The server runs on port specified in the `config.js` file (default is 5080).
- API routes are prefixed with `/api`. Example: `http://localhost:5080/api/cars`
- Available endpoints:
  - `GET /api/cars`: Get all cars.
  - `GET /api/cars/?id=`: Get a specific car by ID.
  - `POST /api/cars`: Create a new car.
  - `PUT /api/cars/?id=`: Update an existing car.
  - `DELETE /api/cars/?id=`: Delete a car by ID.

## Configuration

- Modify the `config.js` file to change the port or any other configuration settings.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or create a pull request.
