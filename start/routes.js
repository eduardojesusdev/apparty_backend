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
  Route.post('/signup', 'SignUpController.ownerStore')
  Route.post('/login', 'LoginController.ownerLogin')
  Route.post('/forgot-password', 'forgotController.ownerForgot')
}).prefix('owner')
//end guest


//start user
Route.group(() => {
  Route.get('/', 'PartyController.all')
  Route.post('/{slug}', 'PartyController.single')
  Route.post('/{slug}/presence/{user_id}', 'UserController.changePresence')
}).middleware(['auth'])

Route.group(() => {
  Route.get('/', 'PartyController.all')
  Route.post('/{slug}', 'PartyController.single')
  Route.post('/{slug}/presence/{user_id}', 'UserController.changePresence')
}).prefix('profile').middleware(['auth'])
//end user



//start owner
Route.group(() => {
  Route.post('/', 'PartyOwnerController.all')
  Route.post('/{slug}', 'PartyOwnerController.single')
  Route.post('/edit/{slug}', 'PartyController.edit')
  Route.post('/delete/{slug}', 'PartyController.delete')
}).prefix('dashboard').middleware(['ownerAuth'])
//end owner
