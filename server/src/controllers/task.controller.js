const TaskService = require('../services/task.service')

class TaskController {
	async getTask(req, res) {
		try {
			const result = await TaskService.getTask(req.query.level)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: `error in get: ${error}` })
		}
	}

	async getAllTasks(req, res) {
		try {
			const result = await TaskService.getAllTasks()
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: `error in get: ${error}` })
		}
	}
}

module.exports = new TaskController()
