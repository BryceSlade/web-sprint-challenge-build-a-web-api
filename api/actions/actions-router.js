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

module.exports = router;