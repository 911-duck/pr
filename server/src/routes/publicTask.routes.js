const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/publicTask.controller')

router.get('/', TaskController.getTask)
router.get('/ALL', TaskController.getAllTasks)
router.post('/CREATE', TaskController.create)

module.exports = router
