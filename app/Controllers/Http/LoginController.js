'use strict'

class LoginController {
  async login ({request, response, auth}){
    try {
      const {email, password} = request.all()
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      console.log(error)
      return response.status(500).send({erro: error})
    }
  }
}

module.exports = LoginController
