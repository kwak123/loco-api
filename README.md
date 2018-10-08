# loco-api

Open access API for our front-end and mobile apps
<strong>This is not a city-funded application. All data is retrieved from public access points providing transit information for supported cities</strong>

Be sure to check our wiki for more information!

## Supported Cities
<a href="http://web.mta.info/developers/"><strong>New York</strong></a>
Data is stored on our server, there is no way to directly query MTA servers

## Getting Started

### HEADS UP
The latest version of MySQL uses a new authing method that is currently not supported by the node mysql driver.

Fix and tracking issue available here:
https://github.com/mysqljs/mysql/pull/1962#issuecomment-390900841

To get started with local development, a few steps are required.

### Required file creation
Inside of `env`, you're going to need a file called `keys.js`.
The file will need to export:
```
module.exports = {
  // should be 'localhost'
  DB_HOST,

  // whatever your MySQL server port number is
  DB_PORT

  // whatever you name your db
  DB_NAME,

  // for localhost, 'root'
  DB_USER,

  // your mysql root pw, by default it's ''
  DB_PASSWORD,

  // any string, used for write permission to the db through the routes
  PRIVILIGED_ACCESS,

  // desired server port number
  PORT,
};
```

### Starting up MySQL
The easiest way to get MySQL is Homebrew. Not going too deep into how to get Homebrew.

* Install Homebrew then run these commands.
  1. `brew update`
  2. `brew install mysql`

* Open up a terminal window and run `mysqld`.
  * You can get the `DB_PORT` string here, where it says `port: XXXX`.

* Open up _another_ terminal window and run `mysql -h localhost -u root`.

* From here, input `CREATE DATABASE <db_name>`, inserting whatever you want for the db name in place of `<db_name>`
  * This is the `DB_NAME`

* Close the db connection, then run `yarn start`.

And that's it! After that, read through the routes docs to figure out how you can hydrate the database with transit data.

## TODOS
- [ ] Improve ReadMe documentation
- [ ] Dedicated domain name for loco-api
- [ ] Add eslint rules