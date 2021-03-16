'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
/** @type {import('@adonisjs/framework/src/Env')} */

const Route = use('Route')
const Env = use('Env')


Route.group(() => {
  Route.get('/', () => {
    return {
      api_version: Env.get('API_VERSION'),
      application_name: Env.get('APP_NAME')
    }
  })

  Route.post('/signup', 'SignUpController.store')
  Route.post('/login', 'LoginController.login')

})

// Route.group(() => {

// }).middleware(['sessionCheck']).prefix('painel')

