const express = require('express')
const router =  express.Router()
const { getApplication, updateApplication, createApplication } = require('../controllers/applications.controllers')

const passport = require('../libs/passport')
const applicationNotConfir = require('../middlewares/isConfirPut.middelwares')


router.route('/application')
.get(passport.authenticate('jwt', {session: false}), getApplication)
.post(passport.authenticate('jwt', {session: false}), createApplication)
.put(passport.authenticate('jwt', {session: false}), applicationNotConfir, updateApplication)


module.exports = router