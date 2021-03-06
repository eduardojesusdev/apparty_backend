'use strict'

const Party = use('App/Models/Party')
const Database = use('Database')
const { validate } = use('Validator')
const Env = use('Env')


class PartyOwnerController {

  async all({request, response, auth}){
    let page = request.get().page
    if (!page || page == 0) page = 1

    try {
      const parties = await Database
      .from('parties')
      .where('owner_id', auth.user.id)
      .paginate(page, Env.get('PER_PAGE'))

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }

  }

  async add({request, response, auth}){

    const data = request.body
    const rules = {
      name: "required | min:2",
      description: "required | max:255",
      party_slug: "required | unique:parties",
      type_event: "required",
      address: "required",
      zipcode: "required",
      number: "required",
      district: "required",
      latitude: "required",
      longitude: "required",
      city: "required",
      state: "required | max:2",
      tel: "required",
      ticket_link: "required",
      banner_link: "required",
      atractions: "required",
      date_init: "required",
      date_close: "required"
    }

    const messages = {
      "name": "Nome da festa é obrigatório",
      "name.min": "Nome da festa precisa ter no mínimo 2 caractéres",
      "description": "Descrição é obrigatório",
      "description.max": "Descrição deve ter no máximo 255 caractéres",
      "party_slug": "Slug é obrigatório",
      "party_slug.unique": "Esta slug já existe",
      "type_event": "Tipo de evento é obrigatório",
      "address": "Endereço é obrigatório",
      "zipcode": "CEP é obrigatório",
      "number": "Número é obrigatório",
      "district": "Bairro é obrigatório",
      "latitude": "Latitude é obrigatório",
      "longitude": "Longitude é obrigatório",
      "city": "Cidade é obrigatório",
      "state": "UF é obrigatório",
      "state.max": "UF deve ter no máximo 2 caractéres",
      "point_of_reference": "Ponto de referência é obrigatório",
      "tel": "Telefone é obrigatório",
      "ticket_link": "Ticket link é obrigatório",
      "banner_link": "Banner link é obrigatório",
      "date_init": "Data de inicio é obrigatório",
      "date_close": "Data de encerramento é obrigatório"
    }

    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      const messages = validation.messages()
      response
      .status(400)
      .send({
        message: messages
      })
    }

    data.presences = '[]'

    try {
      const party = await new Party()

      party.name = data.name
      party.description = data.description
      party.owner_id = auth.user.id
      party.party_slug = data.party_slug
      party.type_event = data.type_event
      party.address = data.address
      party.zipcode = data.zipcode
      party.number = data.number
      party.district = data.district
      party.city = data.city
      party.state = data.state
      party.tel = data.tel
      party.ticket_link = data.ticket_link
      party.banner_link = data.banner_link
      party.atractions = data.atractions
      party.latitude = data.latitude
      party.longitude = data.longitude
      party.tutorial_video_link = data.tutorial_video_link
      party.point_of_reference = data.point_of_reference
      party.presences = data.presences
      party.theme = data.theme
      party.date_init = data.date_init
      party.date_close = data.date_close

      if(await party.save()){
        console.log(party)
        response
        .status(200)
        .send({
          message: "Festa criada com sucesso!",
          slug: party.party_slug
        })
      }
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async edit({request, response, auth}){

    const data = request.body
    const rules = {
      name: "required | min:2",
      description: "required | max:255",
      type_event: "required",
      address: "required",
      zipcode: "required",
      number: "required",
      district: "required",
      city: "required",
      state: "required | max:2",
      tel: "required",
      latitude: "required",
      longitude: "required",
      ticket_link: "required",
      banner_link: "required",
      atractions: "required",
      date_init: "required",
      date_close: "required"
    }

    const messages = {
      "name": "Nome da festa é obrigatório",
      "name.min": "Nome da festa precisa ter no mínimo 2 caractéres",
      "description": "Descrição é obrigatório",
      "description.max": "Descrição deve ter no máximo 255 caractéres",
      "type_event": "Tipo de evento é obrigatório",
      "address": "Endereço é obrigatório",
      "zipcode": "CEP é obrigatório",
      "number": "Número é obrigatório",
      "district": "Bairro é obrigatório",
      "city": "Cidade é obrigatório",
      "state": "UF é obrigatório",
      "latitude": "Latitude é obrigatório",
      "longitude": "Longitude é obrigatório",
      "state.max": "UF deve ter no máximo 2 caractéres",
      "point_of_reference": "Ponto de referência é obrigatório",
      "tel": "Telefone é obrigatório",
      "ticket_link": "Ticket link é obrigatório",
      "banner_link": "Banner link é obrigatório",
      "date_init": "Data de inicio é obrigatório",
      "date_close": "Data de encerramento é obrigatório"
    }

    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      const messages = validation.messages()
      response
      .status(400)
      .send({
        message: messages
      })
    }

    try {
      const party = await Party.findByOrFail('party_slug', request.params.party_slug, 'owner_id', auth.user.id)

      party.name = data.name
      party.description = data.description
      party.type_event = data.type_event
      party.address = data.address
      party.zipcode = data.zipcode
      party.number = data.number
      party.district = data.district
      party.city = data.city
      party.state = data.state
      party.tel = data.tel
      party.ticket_link = data.ticket_link
      party.banner_link = data.banner_link
      party.atractions = data.atractions
      party.tutorial_video_link = data.tutorial_video_link
      party.point_of_reference = data.point_of_reference
      party.presences = data.presences
      party.latitude = data.latitude
      party.longitude = data.longitude
      party.theme = data.theme
      party.date_init = data.date_init
      party.date_close = data.date_close

      if(await party.save()){
        response
        .status(200)
        .send({
          message: "Festa atualizada com sucesso!",
          slug: party.party_slug
        })
      }
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async single({auth, request, response}){
    const slug = request.params.party_slug
    try {
      const single = await Party.findByOrFail('party_slug', slug, 'owner_id', auth.user.id)
      console.log(single)
      response
      .status(200)
      .send(single)
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async delete({auth, response, request}){
    try {
      const party_slug = request.body.party_slug
      const party = await Party.findByOrFail('party_slug', party_slug, 'owner_id', auth.user.id)
      await party.delete()

      response
      .status(200)
      .send({
        party: party,
        message: 'Festa removida com sucesso!'
      })

    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async generateSlug({request, response}){

    try {
      let party_slug = request.body.party_slug

      const rules = {
        party_slug: "required | unique:parties"
      }

      let validation = await validate(party_slug, rules)
      let i = ''
      while(validation.fails()) {
        party_slug = `${party_slug}_${i}`
        validation = ''
        i++
        validation = await validate(party_slug, rules)
      }

      response
      .status(200)
      .send({party_slug: party_slug})
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }
}

module.exports = PartyOwnerController
