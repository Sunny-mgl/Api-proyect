const models = require('../database/models')

const { CustomError } = require('../utils/helpers')

class ApplicationService {


  static async getApplication404(id) {
    // debe traer photos, documents y payments
    const appli = await models.Applications.findByPk(id, {
      include: [
        {
          model: models.ApplicationsPhotos,
          as: 'photos'
        },
        {
          model: models.ApplicationDocuments,
          as: 'documents'
        },
        {
          model: models.ApplicationsPayments,
          as: 'payments'
        }
      ]
    })
    // si queremos hacer que truene algo por un posible error necesitamos usar un throw 
    if (!appli) throw new CustomError('Not fount applicatios', 404, 'Not found')
    return appli
  }


  async getApplicationOr404raw(id) {
    const appli = await models.Applications.findByPk(id, {raw: true})
    if (!appli) throw new CustomError('Not fount applicatios', 404, 'Not found')
    return appli
  }

  static async createApplication(body) {
    const transaction = await models.sequelize.transaction()
    try {
      const newApplication = await models.Applications.create({
        // esta es otra forma de hacer lo hice en update
        user_id: body.user_id,
        legal_first_names: body.legal_first_names,
        legal_last_names: body.legal_last_names,
        nationality: body.nationality,
        email: body.email,
        phone: body.phone,
        date_of_birth: body.date_of_birth,
        gender: body.gender,
        passport_number: body.passport_number,
        passport_expiration_date: body.passport_expiration_date,
        residence: body.residence,
        residence_address: body.residence_address,
        job: body.job,
        comments: body.comments,
        status: 'draft'
      }, {
        transaction
      })
            
      await transaction.commit()
      return newApplication
    } catch (error) {
      await transaction.rollback()
      throw error 
    }
  }


  // cuando creamos, actualizamos o borramos debemos hacer una trasaccion
  static async updateApplication(id, body) {
    const transaction = await models.sequelize.transaction()
    try {
      const application = await models.Applications.findByPk(id)
      if (!application) throw new CustomError('Not fount applicatios', 404, 'Not found')

      const updateApplicati = await application.update(body, {
        transaction,
        // si yo saco unos de los campos ue se encuentra en field no se va a actualizar, por ejemplo aqui no se pase el user_id porque es el que no quiero actulizar 
        fields: [
          'legal_first_names', 'legal_last_names', 'nationality', 'email', ' phone', 'date_of_birth',
          'gender', ' passport_number', 'passport_expiration_date', 'residence', 'residence_address', 'job',
          'comments', 'status'
        ]
      })
      // cuando hacemos una transaction es importante hacer un commit y roolback
      await transaction.commit()
      return updateApplicati
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async addPaymentInfo(user_id, payment_intent) {
    const transaction = await models.sequelize.transaction()
    try {
      let application = await models.Applications.findByPk(user_id)

      if (!application) throw new CustomError('Not found Application', 404, 'Not Found')

      await application.createPayment({application_id:user_id, payment_intent:payment_intent},{ transaction })

      await transaction.commit()

      return application
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}


module.exports = ApplicationService