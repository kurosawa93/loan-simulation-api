# Loan Simulation API

This API is created to simulate loan categorizing based on preferred profile and loan term criterion. To calculate profile score, Simple Additive Weighing (SAW) algorithm was used.

## Prerequisite

To run this application, your local machine must have these tools installed

- Node.js >= 8
- npm >= 3
- AdonisJS 4.1
- PostgreSQL

to install AdonisJS you can run this command `npm install -g @adonisjs/cli`. 

## Installation
To install this application, you can follow these steps below;

- `git clone git@github.com:kurosawa93/loan-simulation-api.git`
- `cd loan-simulation-api
- `npm install`
- `cat .env` (creating .env files. Example of a valid .env are available below)
- `adonis migration:run` (assuming you have AdonisJS and PostgreSQL installed)
- `adonis serve --dev`

After the last step, the application now should be listening to port `3333` in your local machine. You can try hit `http://localhost:3333/api/data`, it should be returning proper response if installation is correctly done.

## Environment Variables
This app utilize `.env` files as source for environment variable. Please make sure you create a proper `.env` file first before doing any action with the application. Below is an example of how a valid `.env` file.

```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
CACHE_VIEWS=false
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
APP_KEY=rzYsDLoLdYX6apDtvqKB88b8DlDQy009
HASH_DRIVER=bcrypt

DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=api_credit_simulation
```

## Migration files
`adonis migration:run` command is a command to run all available migration files in this application. Migration files are located in `database/migrations` directory. Please make sure you already created a proper database configuration in your `.env` file before running the migrations.

## Available Routes
These routes are after a successfull installation;

- `GET: api/data` this is to retrieve the borrower data. accepts `status` as query string
- `POST: api/data/:id` this is to evaluate profile from selected borrower id
- `POST: api/upload` this is to upload csv file and store borrower data. Please use single file per request, multiple file per request is not tested and it may lead to an unexpected behaviour

