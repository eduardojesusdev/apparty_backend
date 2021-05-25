'use strict'

const { find } = require("@adonisjs/framework/src/Route/Store")

const User = use('App/Models/User')

const { validate } = use('Validator')

class SignUpController {

  async ownerStore({request, response}){

    const data = request.body
    const rules = {
      name: "required | min:3",
      email: "required | email | unique:users",
      birthdate: "required | date",
      password: "required|min:5|confirmed",
      password_confirmation: "required"
    }

    const messages = {
      "name.required": "Nome é obrigatório",
      "name.min": "Nome deve ter no mínimo 3 caractéres",
      "email.required": "Email é obrigatório",
      "email.email": "Email inválido",
      "email.unique": "Email já utilizado",
      "birthdate.required": "Data de nascimento é obrigatório",
      "birthdate.date": "Data de nascimento inválida",
      "password.required": "Senha é obrigatório",
      "password.min": "Senha deve conter no minimo 5 caractéres",
      "password.confirmed": "As senhas não coincidem",
      "password_confirmation.required": "Confirmação de senha obrigatório"
    }

    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      const messages = validation.messages()
      console.log(messages)
      return response.status(400).send({message: messages})
    }

    try {
      const user = await new User()
      user.name = data.name
      user.email = data.email
      user.password = data.password
      user.birthdate = data.birthdate
      if(await user.save()){
        return response.status(200).send({
          message: "Usuário criado com sucesso!"
        })
      }
    } catch (error) {
      return response.status(400).send({erro: error.message})
    }
  }

}

module.exports = SignUpController
