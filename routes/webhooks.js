const express = require('express')
const router = express.Router()

const { stripeWebhook } = require('../controllers/webhooks.controller');

router
  .route('/stripe')
  .post(
    stripeWebhook
  );

module.exports = router