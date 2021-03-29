'use strict'
const Party = use('App/Models/Party')

class PartyController {
  async all({response}){
    const parties = await Party.all()
    response.send(parties)
  }

  async single({request, response}){
    const slug = request.body.slug
    const single = await Party.where('slug', slug).fetch()

    response.send(single)
  }
}

module.exports = PartyController
