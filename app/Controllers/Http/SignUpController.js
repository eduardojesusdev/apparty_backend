'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class SignUpController {
  async store({request, response}){
    const data = request.body
    const rules = {
      name: "required | min:3",
      email: "required | email | unique:users",
      password: "required|min:5|confirmed",
      password_confirmation: "required"
    }
    const messages = {
      "name.required": "Nome é obrigatório",
      "email.required": "Email é obrigatório",
      "password.required": "Senha é obrigatório",
      "email.unique": "Email já utilizado",
      "password.min": "Senha deve conter no minimo 5 caracteres",
      "password.confirmed": "As senhas não coincidem",
      "password_confirmation.required": "Confirmação de senha obrigatório"
    }
    const validation = await validate(data, rules, messages)
    if(validation.fails()) {
      console.log(validation.messages())

      const messages = validation.messages()
      return response.status(400).send({message: messages})
    }
    try {
      const user = await new User()
      user.name = data.name
      user.email = data.email
      user.password = data.password
      user.favorites = {}
      if(await user.save()){
        return response.status(200).send({message: "Usuário criado com sucesso!"})
      }
    } catch (error) {
      console.log(error)
      return error
    }

  }
}

module.exports = SignUpController
