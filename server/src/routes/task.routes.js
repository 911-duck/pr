const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/task.controller')

router.get('/', TaskController.getTask)
router.get('/ALL', TaskController.getAllTasks)

module.exports = router
