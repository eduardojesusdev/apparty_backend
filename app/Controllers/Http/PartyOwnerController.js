'use strict'

class PartyOwnerController {
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

  async insert({request, response}){

    const data = request.body
    const rules = {
      name: "required | min:3",
      description: "required | max:255",
      owner_id: "required",
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
      date_close: "required | date",
    }

    const messages = {
      "name": "Nome da festa é obrigatório",
      "description": "Descrição é obrigatório",
      "owner_id": "ID do dono da festa é obrigatório",
      "party_slug": "Slug é obrigatório",
      "type_event": "Tipo de evento é obrigatório",
      "address": "Endereço é obrigatório",
      "zipcode": "CEP é obrigatório",
      "number": "Número é obrigatório",
      "district": "Bairro é obrigatório",
      "city": "Cidade é obrigatório",
      "state": "UF é obrigatório",
      "point_of_reference": "Ponto de referência é obrigatório",
      "tel": "Telefone é obrigatório",
      "ticket_link": "Ticket link é obrigatório",
      "banner_link": "Banner link é obrigatório",
      "date_init": "Data de inicio é obrigatório",
      "date_close": "Data de encerramento é obrigatório",
    }

    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      const messages = validation.messages()
      console.log(messages)
      return response.status(400).send({message: messages})
    }

    try {
      const owner = await new Owner()
      owner.name = data.name
      owner.email = data.email
      owner.password = data.password
      owner.birthdate = data.birthdate
      if(await owner.save()){
        return response.status(200).send({message: "Usuário criado com sucesso!"})
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async single({request, response}){
    const slug = request.body.slug
    const single = await Party.where('slug', slug).first()

    response.status(200).send(single)
  }
}

module.exports = PartyOwnerController
