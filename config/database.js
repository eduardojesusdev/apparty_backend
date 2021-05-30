'use strict'


/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')

const CLEARDB_DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'))

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with Mongodb databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mysql'),
  /*-------------------------------------------------------------------------*/
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', CLEARDB_DATABASE_URL.host),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', CLEARDB_DATABASE_URL.username),
      password: Env.get('DB_PASSWORD', CLEARDB_DATABASE_URL.password),
      database: Env.get('DB_DATABASE', CLEARDB_DATABASE_URL.pathname.substr(1))
    }
  }
}
