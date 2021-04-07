'use strict'
const Party = use('App/Models/Party')

class PartyController {
  async show({response}){
    const badaladas = await Party.where('presences', presences).fetch()
    const acontecendo_agora = await Party.where('date_init', '<=', Date.now()).fetch()
    const proximas_horas = await Party.where('date_init', '>=', Date.now() + 8).fetch()
    const tematicas = await Party.where('is_tematic', '!=', null).fetch()

    response.status(200).send({
      badaladas,
      acontecendo_agora,
      proximas_horas,
      tematicas
    })
  }

  async single({request, response}){
    const slug = request.body.slug
    const single = await Party.where('slug', slug).first()

    response.status(200).send(single)
  }

  async triggerPresence({request, response, auth}){
    var partySlug = request.body.party_slug
    var user_id = auth.user._id
    const party = await Party.where('party_slug', partySlug).first()

    var added, removed = ''

    if (user_id in party.presences) {
      function deleteFromObject(keyToDelete, obj) {
        var l = keyToDelete.length;
        for (var key in obj)
            if (key.substr(0, l) == keyToDelete)
                delete obj[key];
    }

    deleteFromObject(user_id, party.presences)
    removed = true
    }else{
      let json = party.presences
      json[user_id] = user_id

      party.presences = json
      added = true
    }

    if(await party.save()){
      response.status(400).send({
        add: added,
        removed: removed
      })
    }else{
      response.status(400).send(false)
    }
  }
}

module.exports = PartyController
