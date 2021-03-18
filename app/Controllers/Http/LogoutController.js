'use strict'

class LogoutController {
  async logout({response, auth}){
    await auth.logout()
    return response.status(200).send(true)
  }
}

module.exports = LogoutController
