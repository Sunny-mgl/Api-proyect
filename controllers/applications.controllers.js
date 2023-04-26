const ApplicationService = require("../services/application.service")
// const applicationService = new ApplicationService()

const getApplication = async (request, response, next) => {
    try {
       const {id} = request.user
       const application = await ApplicationService.getApplication404(id)
        return response.json({results: application})
    } catch (error) {
        next(error)
    }
}

const createApplication = async (request, response, next) =>{
    try {
        const {id} = request.user
        const {body} = request
        body.user_id= id
        const application = await ApplicationService.createApplication(body)
        return response.status(201).json({results: application})
    } catch (error) {
        next(error)
    }
}

const updateApplication = async (request, response, next) => {
    try {
        const {id} = request.user
        const {body} = request
        const application = await ApplicationService.updateApplication(id, body)
        return response.json({results: application})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getApplication,
    createApplication,
    updateApplication
}