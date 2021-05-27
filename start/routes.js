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

//owner guest
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
//end owner guest

//start owner
Route.group(() => {
  Route.get('/', 'PartyOwnerController.all')
  Route.get('/party/:party_slug', 'PartyOwnerController.single')

  Route.post('/generate-slug', 'PartyOwnerController.generateSlug')
  Route.post('/party/add', 'PartyOwnerController.add')
  Route.post('/edit/:party_slug', 'PartyOwnerController.edit')
  Route.post('/delete/:party_slug', 'PartyOwnerController.delete')
}).prefix('owner').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'OwnerController.get')
  Route.post('/edit', 'OwnerController.update')
  Route.delete('/delete', 'OwnerController.delete')
}).prefix('owner/profile').middleware(['auth'])

//end owner
