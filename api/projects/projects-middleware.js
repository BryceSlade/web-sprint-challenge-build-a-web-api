const Projects = require('./projects-model')

// async function validateProjectId (req, res, next) {
//     try {
//         const project = await Projects.get(req.params.id)
//         if (!project) {
//             res.status(404).json({
//                 message: 'Project with the specified id not found'
//             })
//         }
//         else {
//             req.project = project
//             next()
//         }
//     }
//     catch (error) {
//         res.status(500).json({
//           message: 'Problem finding project'
//         })
//       }
// }

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
    const { name } = req.body
    if (!name || !name.trim()) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } 
    else {
      req.name = name.trim
      next()
    }
}

module.exports = {
    validateProjectId,
    validateProject
}