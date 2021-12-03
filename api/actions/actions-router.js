const express = require('express');
const { validateActionId, validateAction } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'Error retrieving actions list'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: 'The action with the specified id does not exist'
                })
            }
            else {
                res.status(200).json(action)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving action'
            })
        })
})

router.post('/', (req, res) => {
    const newAction = req.body
    if (!newAction.project_id || !newAction.description || !newAction.notes) {
        res.status(400).json({
            message: 'Please provide a project id, description, and notes'
        })
    }
    else {
        Actions.insert(newAction)
            .then(() => {
                res.status(201).json(newAction)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'Error adding action'
            })
            })
    }
})

router.put("/:id", validateActionId, validateAction, async (req, res,) => {
    console.log(req.params.id)
    const updatedAction = await Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
        })
    res.status(200).json(updatedAction)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.actions)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;