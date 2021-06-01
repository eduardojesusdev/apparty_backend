'use strict'


/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = use('url-parse')

const db = new Url(Env.get('JAWS_DATABASE_URL'))

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
      host: Env.get('DB_HOST', db.host),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', db.username),
      password: Env.get('DB_PASSWORD', db.password),
      database: Env.get('DB_DATABASE', db.pathname.substr(1))
    }
  }
}
