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

    static async createApplication(obj) {
        const transaction = await models.sequelize.transaction()
        try {
            const newApplication = await models.Applications.create({ 
                // esta es otra forma de hacer lo hice en update
                user_id: obj.user_id,
                legal_first_names: obj.legal_first_names,
                legal_last_names: obj.legal_last_names,
                nationality: obj.nationality,
                email: obj.email,
                phone: obj.phone,
                date_of_birth: obj.date_of_birth,
                gender: obj.gender,
                passport_number: obj.passport_number,
                passport_expiration_date: obj.passport_expiration_date,
                residence: obj.residence,
                residence_address: obj.residence_address,
                job: obj.job,
                comments: obj.comments,
                status: 'draft'
            }, {
                transaction
            } 
            )  
            
            await transaction.commit()      
            return newApplication
        } catch (error) { 
            await transaction.rollback()
           throw error  
        }
    }


    // cuando creamos, actualizamos o borramos debemos hacer una trasaccion
    static async updateApplication(id, obj) {
        const transaction = await models.sequelize.transaction()
        try {
            const application = await models.Applications.findByPk(id)
            if (!application) throw new CustomError('Not fount applicatios', 404, 'Not found')

            const updateApplicati = await application.update(obj, {
                transaction,
                // si yo saco unos de los campos ue se encuentra en field no se va a actualizar, por ejemplo aqui no se pase el user_id porque es el que no quiero actulizar 
                fields: [
                    'legal_first_names', 'legal_last_names', 'nationality', 'email', ' phone', 'date_of_birth_date',
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
}


module.exports = ApplicationService