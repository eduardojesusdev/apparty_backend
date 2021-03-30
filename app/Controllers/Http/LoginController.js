'use strict'

class LoginController {
  async login ({request, response, auth}){
    try {
      const {email, password} = request.all()
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      console.log(error)
      response.status(500).send({erro: error})
    }
  }
  async loginOwner ({request, response, auth}){
    try {
      const {email, password} = request.all()
      const token = await auth.authenticator('jwtOwner').attempt(email, password)
      response.send(token)
    } catch (error) {
      console.log(error)
      response.status(500).send({erro: error})
    }
  }


}

module.exports = LoginController
