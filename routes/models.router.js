const express = require('express')
const routesAuth = require('./auth.routes')
const routesApplication = require('./application.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/applications', routesApplication)

}

module.exports = routerModels
