/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage', locals: { page: 'homepage' } },
  '/oportunidades': { view: 'pages/opportunities', locals: { page: 'opportunities' }},
  '/login': { view: 'pages/login', locals: { page: 'login' } },
  '/signup': { view: 'pages/signup' , locals: { page: 'signup' }},
  '/perfil': { view: 'pages/perfil' , locals: { page: 'perfil' }},
  '/voluntarios': { view: 'pages/voluntarios' , locals: { page: 'voluntarios' }},
  '/oppo': { view: 'pages/oppo' , locals: { page: 'oppo' }},
  '/oscs': { view: 'pages/oscs' , locals: { page: 'osc' }},

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  //Rotas de manipulação do usuário
  'POST /user': 'UserController.create',
  'PUT /atualizarCadastro/:id': 'PerfilController.update',
  'PUT /user/:id': 'UserController.updateCustomizacoes',
  'GET /user/:id': 'UserController.populateCustomizacoes',
  'POST /login': 'UserController.login',
  'GET /perfil/:id': 'UserController.findVolunteerById',
  'GET /logout': 'UserController.logout',




  //Rotas de manipulação da customização
  'POST /customizacao': 'CustomizacaoController.create',

  //Rotas de manipulação da oportunidade
  'POST /oportunidade': 'OportunidadeController.create',
  'POST /searchUser': 'UserController.findByName',
  'POST /searchResults': 'OportunidadeController.searchResults',
  'GET /oportunidades-engajamento': 'OportunidadeController.findEngagements',
  'GET /oportunidadesAll': 'OportunidadeController.findAll',
  'GET /card-oportunidade/:id': 'OportunidadeController.popupById',
  'GET /oportunidade/:id': 'OportunidadeController.findSpecific',

  //Rotas de manipulação de voluntário
  'GET /volunteers': 'UserController.listVolunteers',
  'GET /volunteer': 'UserController.findVolunteer',
  'GET /new-volunteer': 'UserController.findNewVolunteer',
  'GET /popup-volunteer': 'UserController.findPopup',

  //Rotas de manipulção das organizações
  'POST /new-org': 'OrganizacaoController.create',
  'GET /organizations': 'OrganizacaoController.find',
  'GET /organization/:id': 'OrganizacaoController.findOne',
  'GET /new-organizations': 'OrganizacaoController.findNew',
  'GET /popup-osc': 'OrganizacaoController.findPopup', 

};
