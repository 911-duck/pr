const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI)

		console.log(`MongoDB connected: ${connect.connection.host}`)

		mongoose.connection.on('error', err => {
			console.error(`MongoDB connection error: ${err}`)
		})

		mongoose.connection.on('disconnected', err => {
			console.error(`MongoDB disconnected`)
		})

		mongoose.connection.on('reconnected', err => {
			console.error(`MongoDB reconnected`)
		})
	} catch (error) {
		console.log(`Error in connection: ${error.message}`)
		process.exit(1)
	}
}

module.exports = connectDB
