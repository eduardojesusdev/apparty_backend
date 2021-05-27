'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')


class UserController {
  async get({auth, response}){
    try {
      let user = auth.user.$attributes
      response
      .status(200)
      .send({ user })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async update({request, response, auth}){

    const data = request.body

    const rules = {
      name: "required | min:2",
      bio: "max:255"
    }

    const messages = {
      "name": "Nome é obrigatório",
      "name.min": "Nome precisa ter no mínimo 2 caractéres",
      "bio.max": "Descrição deve ter no máximo 255 caractéres",
    }

    const validation = await validate(data, rules, messages)

    if(validation.fails()) {
      const messages = validation.messages()

      response
      .status(400)
      .send({
        message: messages
      })
      return
    }

    try {
      const user = await User.find(auth.user.id)
      user.name = data.name,
      user.bio = data.bio

      if(await user.save()){
        response
        .status(200)
        .send({
          user: user,
          message: 'Usuário atualizado com sucesso!'
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

  async delete({auth, response}){
    try {
      const id = auth.user.id
      const user = await User.find(id)
      await user.delete()

      response
        .status(200)
        .send({
          user: user,
          message: 'Usuário removido com sucesso!'
        })

    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }
}

module.exports = UserController
