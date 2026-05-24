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
		},
		testCode: {
			type: String,
			required: true
		},			
		difficulty: {
			type: String,
			default: "8kyu",
			enum: ['8kyu', '7kyu']
		},
		initialCode: {
			type: String,
			required: true
		},
		createby: {
			type: String,
			required: true
		},
	}
)

const Task = mongoose.model('ptasks', taskSchema)

module.exports = Task
