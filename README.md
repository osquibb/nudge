# Nudge

A currently aimless project which I'm using to brush up on ReactJs Hooks, ExpressJs, PassportJs, KnexJs and any other technologies that I find interesting.

## Available Scripts

In the project directory, you can run:

### `npm i`

Install node dependencies.

### `npm run server`

Runs the express server in the development mode on http://localhost:5000

The server will reload if you make edits (using nodemon).\
You will also see any lint errors in the console.


### `npm run client`

Runs the react app in the development mode on http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Database Configuration
A PostgreSQL database should be running on http://localhost:5432 

See configuration in ~/server.js.

## Database Migrations

See [http://knexjs.org/#Migrations](http://knexjs.org/#Migrations)

### `npm i knex -g`
Install Knex globally to run migrations.
### `knex migrate:latest`
Runs all migrations that have not yet been run.
### `knex migrate:up`
Runs the next chronological migration that has not yet be run.

### `knex migrate:down`
Will undo the last migration that was run.