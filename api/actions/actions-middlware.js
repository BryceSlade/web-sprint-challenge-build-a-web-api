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

module.exports = {
    validateActionId,
    
}