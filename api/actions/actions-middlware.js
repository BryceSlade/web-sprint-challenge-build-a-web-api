const Actions = require('./actions-model')

async function validateActionId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'Action with the specified id not found'
            })
        }
        else {
            req.action = action
            next()
        }
    }
    catch (error) {
        res.status(500).json({
          message: 'Problem finding action'
        })
      }
}

async function validateAction (req, res, next){
    const { project_id, description, notes, completed } = req.body
    if (req.body.project_id === undefined) {
        next({status: 400,
            message: 'missing required project id'
        })
    }
    if (!notes || !notes.trim) {
        next({status: 400,
            message: 'missing required project notes'
        })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}