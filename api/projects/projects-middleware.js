const Projects = require('./projects-model')

async function validateProjectId(req, res, next){
    try{
        const {id} = req.params
        const project = await Projects.get(id)
        if(project){
            req.params = project
            next()
        } else{
            next({status: 404, message: 'project not found'})
        }
    }catch(err){
        next(err)
    }
}

function validateProject (req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        next({
            status: 400,
            message: 'Please fill out name field'
        })
    }
    else if (!description || !description.trim()) {
        next({
            status: 400,
            message: 'Please fill out description field'
        })
    }
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject
}