const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
	const token = req.cookies.accessToken

	if (!token) {
		return res.status(401).json({ message: 'авторизуйтесь пожалуйста' })
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET)
		next()
	} catch (error) {
		res.status(401).json({ message: 'подтвердите свои данные' })
	}
}

module.exports = protect