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

//start guest
Route.group(() => {
  Route.get('/', () => {
    return {
      api_version: Env.get('API_VERSION'),
      application_name: Env.get('APP_NAME')
    }
  })

  Route.post('/signup', 'SignUpController.store')
  Route.post('/login', 'LoginController.login')
  Route.post('/forgot-password', 'forgotController.forgot')
})

Route.group(() => {
  Route.get('/', () => {
    return {
      api_version: Env.get('API_VERSION'),
      application_name: Env.get('APP_NAME_OWNER')
    }
  })
  Route.post('/signup', 'SignUpController.ownerStore')
  Route.post('/login', 'LoginController.loginOwner')
  Route.post('/forgot-password', 'forgotController.forgotOwner')
}).prefix('owner-guest')
//end guest



//start user
Route.group(() => {
  Route.get('/', 'PartyController.show')
  Route.post('/{slug}', 'PartyController.single')
  Route.post('/{slug}/presence', 'PartyController.triggerPresence')
}).prefix('dashboard').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'UserController.show')
  Route.post('/edit', 'UserController.edit')
  Route.post('/delete', 'UserController.delete')
}).prefix('dashboard/profile').middleware(['auth'])
//end user



//start owner
Route.group(() => {
  Route.get('/', 'PartyOwnerController.all')
  Route.post('/party/{party_slug}', 'PartyOwnerController.single')
  Route.post('/edit/{party_slug}', 'PartyOwnerController.edit')
  Route.post('/delete/{party_slug}', 'PartyOwnerController.delete')
}).prefix('owner').middleware(['ownerAuth'])

Route.group(() => {
  Route.get('/', 'OwnerController.show')
  Route.post('/edit', 'OwnerController.edit')
  Route.post('/delete', 'OwnerController.delete')
}).prefix('owner/profile')

//end owner
