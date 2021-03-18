'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OwnerSchema extends Schema {
  up () {
    this.create('owners', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('avatar', 255)
      table.date('birthdate')
      table.timestamps()
    })
  }

  down () {
    this.drop('owners')
  }
}

module.exports = OwnerSchema
