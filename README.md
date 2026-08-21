# IssueFlow

Fullstack issue tracking application for creating, managing, filtering and updating software issues.

Built with react, Node.js, Express, SQLite TypeScript, SQLite, Vitest and Playwright. Includes REST API, automated E2E testing, Unit tests and Github ActionCI/CD .

## Features

- Ticket management (create, edit and delete tickets)
- Change Ticket status
- Ticket priorities
- Ticket details
- Search and filtering
- Dashboard statistics
- SQLite persistence
- Unit Testing with Vitest
- End to End Testing with Playwright
- REST API
- Automated E2E Testing
- CI/CD pipeline with Github Actions

## Tech Stack

### Frontend:

- React
- TypeScript
- SCSS

### Backend:

- Node.js
- Expess
- SQLite

### Testing:

- Playwright
- Vitest

### Tooling:

- Git
- Github Actions
- npm

## Project Structure

```text
Issueflow/
├── client/
|   ├── e2e/
|   ├── src/
|   |   ├── api/
|   |   ├── components/
|   |   ├── hooks/
|   |   ├── layouts/
|   |   ├── pages/
|   |   ├── styles/
|   |   ├── tests/
|   |   └── types/
|
├── server/
|   ├── src/
|   |   ├── controllers
|   |   ├── database
|   |   ├── middleware
|   |   ├── models
|   |   ├── routes
|   |   ├── services
|   |   └── utils
|
└──playwright.cofig.ts
```

## REST-API

Coming soon.

## Installation

### Requirements

- Node.js 22+
- npm

### clone repository

git clone https://github.com/Nycelinux/IssueFlow.git
cd IssueFlow

### Install dependencies

```md
## REST API

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | `/tickets`     | Get all tickets |
| GET    | `/tickets/:id` | Get a ticket    |
| POST   | `/tickets`     | Create a ticket |
| PUT    | `/tickets/:id` | Update a ticket |
| DELETE | `/tickets/:id` | Delete a ticket |
```

### Start development environment

npm run dev

## Testing:

### Unit and Component Tests

The frontend is testes with Vitest.
Tests cover:
Coming soon

npm run dev
npm test -- --run

### End-to-End Testing

E2E tests use a separate SQLite database so that test data does not affect the development database

Playwright tests cover the main user flow:

- ticket creation
- ticket editing
- ticket deletion
- status changes
- opening ticket details
- navigation between dashboard and ticket details

Run:
npm run dev:e2e
npx playwright test

## CI/ CD

Github Actions automatically runs on pushes and pull requests to `main`and `develop`.

The pipeline performs:

1. Install dependencies
2. Run unit tests
3. Run linting
4. Build the Frontend
5. Install Playwright
6. Run E2E Tests
7. Upload the Playwright report on failure

## Technical Highlights

- React application built with TypeScript
- REST-API using Express
- SQLiite Persistence
- Reusable React components
- Automated E2E-Testing with Playwright
- Isolated SQLite database for E2E tests
- Automated CI Pipeline with Github Actions
