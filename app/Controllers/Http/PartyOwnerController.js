'use strict'

const Party = use('App/Models/Party')

const { validate } = use('Validator')


class PartyOwnerController {

  async all({response}){
    console.log('aaaaaaaaa')
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

  async add({request, response, auth}){

    console.log(auth.user.id)

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
      console.log(messages)
      return response.status(400).send({message: messages})
    }

    try {
      const party = await new Party()

      party.name = data.name
      party.description = data.description
      party.owner_id = auth.user._id
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
      party.date_init = data.date_init
      party.date_close = data.date_close

      if(await party.save()){
        return response.status(200).send({message: "Festa criada com sucesso!"})
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async single({request, response}){
    const slug = request.body.slug
    const single = await Party.where('party_slug', slug).first()

    response.status(200).send(single)
  }

  async generateSlug({request, response}){
    return 'works'

    let party_slug = request.body.party_slug

    const rules = {
      party_slug: "required | unique:parties"
    }

    let validation = await validate(data, rules)

    while(validation.fails()) {
      party_slug = `${party_slug}-${Math.random()}`
      validation = ''
      validation = await validate(data, rules)
    }

    return response.status(200).send({slug: party_slug})
  }
}

module.exports = PartyOwnerController
