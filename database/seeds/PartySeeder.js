'use strict'

/*
|--------------------------------------------------------------------------
| PartySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')
const Database = use('Database')

class PartySeeder {
  async run () {
    await Factory.model('App/Models/Party').createMany(5)
  }
}

module.exports = PartySeeder
