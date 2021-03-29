'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class OwnerAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {

    try {
      const isOwner = request.params.token
      await next()
    } catch (error) {
      response.send('api token inválido')
    }
  }
}

module.exports = OwnerAuth
