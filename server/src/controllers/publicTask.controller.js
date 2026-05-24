const TaskService = require('../services/publicTask.service')

class publicTaskController {
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
			console.log(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: `error in get: ${error}` })
		}
	}

	async create (req, res) {
		try {
			const result = await TaskService.create(req.body)
			console.log(req.body)
			console.log(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: `error in get: ${error}` })
		}
	}
}

module.exports = new publicTaskController()
