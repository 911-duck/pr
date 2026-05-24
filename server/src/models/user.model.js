const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 10
		},
		email: {
			type: String,
			minlength: 3,
			required: true
		},
		password: {
			type: String,
			required: true,
			minlength: 9,
		},			
		lvl: {
			type: Number
		},
		lvlPr: {
			type: Number
		}
	}
)

const User = mongoose.model('users', userSchema)

module.exports = User
