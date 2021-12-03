const express = require('express');
const Projects = require('./projects-model')

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'Error retrieving projects list'
            })
        })
})

module.exports = router;