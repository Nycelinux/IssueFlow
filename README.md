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

Coming soon.

## REST-API

Coming soon.

## Installation

### Requirements

- Node.js 22+
- npm

### clone repository

Coming soon.

### Install dependencies

Coming soon.

### Strat development environment

npm run dev

## Testing:

Coming soon.

### Unit and Component Tests

Coming soon.

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
