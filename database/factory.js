'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/Party', async (faker) => {
  return {
    name: faker.word({ length: 10 }),
    description: faker.paragraph({ sentences: 1 }),
    party_slug: faker.sentence({ words: 1 }),
    owner_id: 1,
    type_event: faker.gender({
      extraGenders: ['Hétero', 'LGBTQ+']
    }),
    tutorial_video_link: faker.url({domain: 'www.youtube.com'}),
    address: faker.address(),
    zipcode: faker.zip({plusfour: true}),
    number: faker.integer({ min: 0, max: 999 }),
    district: faker.locale(),
    city: faker.city(),
    state: faker.unique(faker.state, 1),
    tel: faker.phone(),
    ticket_link: faker.url({domain: 'www.ingressocerto.com.br'}),
    banner_link: '/uploads/banners/img.jpg',
    point_of_reference: faker.sentence({ words: 5 }),
    presences: '[]',
    latitude: faker.latitude(),
    longitude: faker.longitude(),
    theme: faker.gender({
      extraGenders: ['Festa do sinal', 'à fantasia', 'Anos 80', 'Brega']
    }),
    atractions: "<h2>An Unordered HTML List</h2><ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>",
    date_init: faker.date(),
    date_close: faker.date()
  }
})
