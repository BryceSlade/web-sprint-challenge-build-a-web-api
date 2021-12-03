const express = require('express');
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

module.exports = router;