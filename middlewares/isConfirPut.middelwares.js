const ApplicationService = require('../services/application.service')
const { CustomError } = require('../utils/helpers')


const applicationService = new ApplicationService()

const applicationNotConfir = async (request, response, next) => {
  try {
    const {id} = request.user
    const applica = await applicationService.getApplicationOr404raw(id)
    if(applica.status != 'confirmed') return next()
    throw new CustomError('Application have the status as confirmed', 403, 'Permition Denied')
  } catch (error) {
    return next(error)
  }
}

module.exports = applicationNotConfir