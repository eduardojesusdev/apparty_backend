'use strict'


/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = use('url-parse')

const db = new Url(Env.get('JAWSDB_URL'))

module.exports = {
  connection: Env.get('DB_CONNECTION', 'mysql'),
  mysql: {
    client: 'mysql',
    connection: {
      host: db.hostname,
      port: db.port,
      user: db.username,
      password: db.password,
      database: db.pathname.substr(1)
    }
  }
}
