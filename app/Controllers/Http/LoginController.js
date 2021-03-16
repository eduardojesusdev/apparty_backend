'use strict'

class LoginController {
  async login ({request, response, auth}){
    try {
      const {email, password, remember} = request.all()
      const token = await auth.remember(remember).attempt(email, password)
      return token
    } catch (error) {
      return response.status(500).send({erro: error})
    }
  }
}

module.exports = LoginController
