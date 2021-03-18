'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('avatar', 255)
      table.string('bio', 255)
      table.date('birthdate').notNullable()

      table.json('favorites')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
