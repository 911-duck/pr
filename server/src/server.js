const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')
const publicTaskRoutes = require('./routes/publicTask.routes')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')

require('dotenv').config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(
	cors({
		methods: 'GET, POST, DELETE, PUT',
		origin: 'https://pr-1iqz.vercel.app',
		credentials: true
	})
)

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/ptask', publicTaskRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
