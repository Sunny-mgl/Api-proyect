const express = require('express')
const routesAuth = require('./auth.routes')
const routesApplication = require('./application.routes')
const routesPayments = require('./payments.routes')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/applications', routesApplication)
  router.use('/payments', routesPayments)

}

module.exports = routerModels
