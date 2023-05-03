
const router = require('express').Router();
const passport = require('../libs/passport');
const { stripeCheckout, getOrCreateStripeUserByEmail } = require('../middlewares/stripe.middleware');
const { applicationIsConfirmedOrErr } = require('../middlewares/isConfirPut.middelwares');

router
  .route('/pay-product')
  .post(
    passport.authenticate('jwt', { session: false }),
    applicationIsConfirmedOrErr,
    getOrCreateStripeUserByEmail,
    stripeCheckout
  );

module.exports = router