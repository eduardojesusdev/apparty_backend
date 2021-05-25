'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class OwnerAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request, response }, next) {
    try {
      console.log('aaaaaaaaaa')
      await auth.check()
    } catch (error) {
      response.status(400).send(error.message)
    }
  }
}

module.exports = OwnerAuth
