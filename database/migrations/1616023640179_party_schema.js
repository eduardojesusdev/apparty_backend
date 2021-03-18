'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartySchema extends Schema {
  up () {
    this.create('parties', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('description', 255).notNullable()
      table.string('owner_id').notNullable()
      table.string('type_event')
      table.string('address')
      table.string('zipcode')
      table.string('number')
      table.string('district')
      table.string('state')
      table.string('point_of_reference')
      table.string('tel')
      table.string('ticket_link')
      table.string('banner_link')
      table.string('tutorial_video_link')
      table.integer('confirmed_persons')
      table.json('atractions')
      table.date('date_init')
      table.date('date_close')
      table.bool('is_closed')
      table.timestamps()
    })
  }

  down () {
    this.drop('parties')
  }
}

module.exports = PartySchema
