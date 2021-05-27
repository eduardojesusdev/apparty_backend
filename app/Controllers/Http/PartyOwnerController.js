'use strict'

const Party = use('App/Models/Party')

const { validate } = use('Validator')


class PartyOwnerController {

  async all({response}){
    try {
      const parties = await Party.all()
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
      city: "required",
      state: "required | max:2",
      tel: "required",
      ticket_link: "required",
      banner_link: "required",
      atractions: "required",
      date_init: "required | date",
      date_close: "required | date"
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
      "city": "Cidade é obrigatório",
      "state": "UF é obrigatório",
      "state.max": "UF deve ter no máximo 2 caractéres",
      "point_of_reference": "Ponto de referência é obrigatório",
      "tel": "Telefone é obrigatório",
      "ticket_link": "Ticket link é obrigatório",
      "banner_link": "Banner link é obrigatório",
      "date_init": "Data de inicio é obrigatório",
      "date_init.date": "Data de inicio é inválida",
      "date_close.date": "Data de encerramento é inválida",
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
      party.tutorial_video_link = data.tutorial_video_link
      party.point_of_reference = data.point_of_reference
      party.presences = data.presences
      party.theme = data.theme
      party.date_init = data.date_init
      party.date_close = data.date_close

      if(await party.save()){
        return response
        .status(200)
        .send(
          {
            message: "Festa criada com sucesso!",
            slug: party.party_slug
          }
        )
      }
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async single({request, response}){
    const slug = request.params.party_slug
    try {
      const single = await Party.findByOrFail('party_slug', slug)
      response.status(200).send(single)
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }

  }

  async generateSlug({request, response}){

    let party_slug = request.body.party_slug

    const rules = {
      party_slug: "required | unique:parties"
    }

    let validation = await validate(party_slug, rules)

    while(validation.fails()) {
      party_slug = `${party_slug}-${Math.random()}`
      validation = ''
      validation = await validate(party_slug, rules)
    }

    response
    .status(200)
    .send({party_slug: party_slug})
  }
}

module.exports = PartyOwnerController
