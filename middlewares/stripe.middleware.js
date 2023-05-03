const stripeLocal = require('../config/stripeLocal')
const usersService = require('../services/users.service')
const productssService = require('../services/products.service')
const CustomError = require('../utils/CustomError')  /* Custom Error Handler    VERIFICAR */


const getOrCreateStripeUserByEmail = async (request, response, next) => {
  try {
    let { id, email } = request.user
    let user = await usersService.getUserStripeClient(id)
    if (user.stripe_client) {
      return next()
    }
    /* Si no tiene un Client, le creará uno */
    const customer = await stripeLocal.customers.create({
      email
    });
    let createClient = await usersService.createStripeClient(id, customer.id)
    return next()
  } catch (error) {
    return next(error);
  }
};

const stripeCheckout = async (request, response, next) => {
  try {

    let { id } = request.user

    /* We checked in the middleware before that, user will always have one */
    let userClient = await usersService.getUserStripeClient(id)

    let products = await productssService.returnProducts()

    if (products.length == 0) throw new CustomError('Not Products on the local DB', 500, 'Application Error')

    if (products.length > 1) throw new CustomError('More than one product in the local DB, this endpoint only allow one product', 500, 'Application Error')

    const session = await stripeLocal.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      currency: 'usd',
      customer: userClient.stripe_client?.client_id,
      line_items: [{
        price: products[0].price_id,
        quantity: 1
      }],
      success_url: request.body.success_url,
      cancel_url: request.body.cancel_url,
    });
    return response.status(201).json({ url: session.url })
  } catch (error) {
    next(error)
  }
}

const applicationIsConfirmedOrErr = async (request, response, next) => {
  try {
    let { id } = request.user
    let application = await applicationsService.getApplicationOr404raw(id)
    
    if (application.status != 'confirmed') throw new CustomError('Application is not Confirmed', 403, 'Permission Denied')

    return next()
  } catch (error) {
    return next(error);
  }
};