const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		task: {
			type: String,
			required: true,
			minlength: 10
		},
		result: {
			type: String,
			required: true
		},
		testCode: {
			type: String,
			required: true
		},			
		difficulty: {
			type: String,
			default: "8kyu",
			enum: ['8kyu', '7kyu', '6kyu', '5kyu']
		},
		initialCode: {
			type: String,
			required: true
		},
		exp: {
			type: Number,
			required: true
		}
	}
)

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
