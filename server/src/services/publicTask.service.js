const Task = require('../models/publicTask.model')

class TaskService {
	async getTask(level) {
		try {
			const tasks = await Task.find({ difficulty: level })

			if (!tasks) {
				return { success: false, error: 'задачи нет такого уровня' }
			}

			return { success: true, data: tasks }

		} catch (error) {
			return { success: false, error: `error in get: ${error}` }
		}
		
	}

	async getAllTasks() {
		try {
			const tasks = await Task.find()

			if (!tasks) {
				return { success: false, error: 'задач нет' }
			}
			console.log(tasks)

			return { success: true, data: tasks }

		} catch (error) {
			return { success: false, error: `error in get: ${error}` }
		}
		
	}

	 async create(data) {
		try {
			const tasks = await Task.create(data)

			console.log(tasks)

			return { success: true, data: tasks }

		} catch (error) {
			return { success: false, error: `error in get: ${error}` }
		}
	 }
}

module.exports = new TaskService()
