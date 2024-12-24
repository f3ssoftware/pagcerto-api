# Pagcerto API

Pagcerto API is a financial service application designed to manage cost centers, invoices, transactions, and more. This project leverages Node.js, Prisma, and PostgreSQL to provide a robust and scalable backend solution.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Cost center and invoice management
- Transaction tracking
- Integration with PostgreSQL
- Dockerized for easy deployment

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/) (v20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/) (v2.0 or later)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/f3ssoftware/pagcerto-api.git
   cd pagcerto-api
   ```

2. Create an `.env` file in the root directory to configure environment variables for the application:
   ```env
   # Application environment
   NODE_ENV=local

   # PostgreSQL database configuration
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=password
   POSTGRES_DB=pagcerto
   DATABASE_URL=postgresql://admin:password@postgres:5432/pagcerto
   ```

3. Ensure the database initialization files are available in the `./initdb/postgres` directory if needed.

## Deployment

### Using Docker Compose

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The services included in the `docker-compose.yml` file are:
   - **PostgreSQL Database**:
     - Exposed on port `5432`
     - Configured with the `pgdata` volume for persistent storage
   - **Pagcerto API**:
     - Exposed on port `3000`
     - Runs in `local` mode with hot-reloading support

3. Verify the containers are running:
   ```bash
   docker-compose ps
   ```

4. Access the API at [http://localhost:3000](http://localhost:3000).

### Stopping the Containers

To stop the containers, run:
```bash
docker-compose down
```

### Cleaning Up

To remove the containers, network, and volumes:
```bash
docker-compose down --volumes
```

## Usage

- Access the API documentation (if available) at `/docs`.
- Test the endpoints using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).
- Database changes can be managed using Prisma migrations:
  ```bash
  npx prisma migrate dev --name init
  ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

