'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartySchema extends Schema {
  up () {
    this.create('parties', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('description', 255).notNullable()
      table.integer('owner_id').notNullable()
      table.string('party_slug').notNullable().unique()
      table.string('type_event')
      table.string('address')
      table.float('latitude')
      table.float('longitude')
      table.string('zipcode')
      table.string('number')
      table.string('district')
      table.string('city')
      table.string('state', 2)
      table.string('point_of_reference')
      table.string('tel')
      table.string('ticket_link')
      table.string('banner_link')
      table.string('theme')
      table.json('presences')
      table.string('tutorial_video_link')
      table.string('atractions')
      table.string('date_init')
      table.string('date_close')
      table.bool('is_closed')
      table.timestamps()
    })
  }

  down () {
    this.drop('parties')
  }
}

module.exports = PartySchema
