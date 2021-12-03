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

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: 'The project with the specified id does not exist'
                })
            }
            else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving project'
            })
        })
})

router.post('/', (req, res) => {
    const newProject = req.body
    if (!newProject.name || !newProject.description) {
        res.status(400).json({
            message: 'Please provide a name and description'
        })
    }
    else {
        Projects.insert(newProject)
            .then(() => {
                res.status(201).json(newProject)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'Error adding project'
            })
            })
    }
})

module.exports = router;