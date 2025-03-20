# API Tests

This project contains automated tests for external API endpoints, specifically testing Issues and Product Units retrieval with pagination.

## Prerequisites

- Node.js (v16 or higher)
- Yarn (v4.4.1 or higher)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

1. Install dependencies:

```bash
yarn install
```

1. Create a `.env` file in the root directory and add your environment variables:

```bash
# Example .env file
API_JWT=<api-jwt>
BASE_URL=https://<tenant>.legitsecurity.co
```

## Project Structure

```bash
├── src/
│   ├── config/           # Configuration management
│   │   ├── config-manager.ts
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   └── api-client.ts    # API client implementation
├── tests/
│   ├── issues.test.ts   # Issues API tests
│   ├── product-units.test.ts  # Product Units API tests
│   └── api.test.ts      # General API tests
├── package.json
├── tsconfig.json
└── .env
```

## Running Tests

To run all tests:

```bash
yarn test
```

To run specific test files:

```bash
# Run only issues tests
yarn test issues.test.ts

# Run only product units tests
yarn test product-units.test.ts
```

## Test Configuration

The project uses:

- Jest for test running
- Winston for logging
- TypeScript for type safety
- Axios for HTTP requests
- dotenv for environment variable management

Test timeouts and other configurations can be found in `src/config/index.ts`.

## Development

1. Build the project:

```bash
yarn build
```

## Environment Variables

Required environment variables:

- `API_JWT`: Your API authentication token
- `BASE_URL`: The base URL for the API (format: <https://tenant.legitsecurity.co>)
