'use strict'

const { find } = require("@adonisjs/framework/src/Route/Store")

const User = use('App/Models/User')
const Owner = use('App/Models/Owner')

const { validate } = use('Validator')

class SignUpController {

  async store({request, response}){

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
      "email.required": "Email é obrigatório",
      "birthdate.required": "Data de nascimento é obrigatório",
      "birthdate.date": "Data de nascimento é inválida",
      "password.required": "Senha é obrigatório",
      "email.unique": "Email já utilizado",
      "password.min": "Senha deve conter no minimo 5 caracteres",
      "password.confirmed": "As senhas não coincidem",
      "password_confirmation.required": "Confirmação de senha obrigatório"
    }

    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      const messages = validation.messages()
      return response.status(400).send({message: messages})
    }

    try {
      const user = await new User()
      user.name = data.name
      user.email = data.email
      user.password = data.password
      user.birthdate = data.birthdate
      user.presences = null;
      if(await user.save()){
        return response.status(200).send({message: "Usuário criado com sucesso!"})
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async ownerStore({request, response}){

    const data = request.body
    const rules = {
      name: "required | min:3",
      email: "required | email | unique:owners",
      birthdate: "required | date",
      password: "required|min:5|confirmed",
      password_confirmation: "required"
    }

    const messages = {
      "name.required": "Nome é obrigatório",
      "email.required": "Email é obrigatório",
      "birthdate.required": "Data de nascimento é obrigatório",
      "birthdate.date": "Data de nascimento é inválida",
      "password.required": "Senha é obrigatório",
      "email.unique": "Email já utilizado",
      "password.min": "Senha deve conter no minimo 5 caracteres",
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
}

module.exports = SignUpController
