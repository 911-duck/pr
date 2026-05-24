const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const ACCESS_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const ACCESS_COOKIE = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	maxAge: 1 * 24 * 60 * 1000
}

const REFRESH_COOKIE = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	maxAge: 7 * 24 * 60 * 60 * 1000
}

const signAccess = user => {
	return jwt.sign({ id: user._id, email: user.email, name: user.name, lvl: user.lvl, lvlPr: user.lvlPr }, ACCESS_SECRET, {
		expiresIn: '2d'
	})
}

const signRefresh = user => {
	return jwt.sign({ id: user._id, email: user.email, name: user.name, lvl: user.lvl, lvlPr: user.lvlPr }, REFRESH_SECRET, {
		expiresIn: '7d'
	})
}

const safeUser = user => ({ id: user._id, email: user.email, name: user.name, lvl: user.lvl, lvlPr: user.lvlPr })

class UserController {

	async register(req, res) {
		try {
			const { email, password, name, lvl, lvlPr } = req.body

			if (!email || !password) {
				return res
					.status(201)
					.json({ message: 'введите пожалуйста все данные' })
			}

			const user = await UserService.register({ email: email, password: password, name: name, lvl: lvl, lvlPr: lvlPr })

			if (user.message) {
				return res.status(201).json({ message: user.message })
			}

			if (user.error) {
				return res.status(201).json({ message: user.message })
			}

			res.cookie('accessToken', signAccess(user), ACCESS_COOKIE)
			res.cookie('refreshToken', signRefresh(user), REFRESH_COOKIE)
			res.status(201).json({ result: safeUser(user) })
		} catch (err) {
			res.status(500).json({ message: 'сбой в системе', error: err.message })
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res
					.status(201)
					.json({ message: 'введите пожалуйста все данные' })
			}

			const user = await UserService.login(email, password)

			if (user.message) {
				return res.status(201).json({ message: user.message })
			}

			if (user.error) {
				return res.status(201).json({ message: user.message })
			}

			res.cookie('accessToken', signAccess(user), ACCESS_COOKIE)
			res.cookie('refreshToken', signRefresh(user), REFRESH_COOKIE)
			res.json({ result: safeUser(user) })
		} catch (err) {
			res.status(500).json({ message: 'сбой в системе', error: err.message })
		}
	}

	async refresh(req, res) {
		const token = req.cookies.refreshToken

		if (!token) return res.status(201).json({ message: 'пожалуйста подтвердите свои данные' })

		try {
			const payload = jwt.verify(token, REFRESH_SECRET)
			const user = await UserService.refresh(payload.id)
			if (!user) return res.status(201).json({ message: 'пожалуйста подтвердите свои данные' })

			res.cookie('accessToken', signAccess(user), ACCESS_COOKIE)
			res.cookie('refreshToken', signRefresh(user), REFRESH_COOKIE)
			res.json({ user: safeUser(user) })
		} catch (error) {
			res.clearCookie('accessToken')
			res.clearCookie('refreshToken')
			res.status(401).json({ message: 'пожалуйста подтвердите свои данные'  })
		}
	}

	logout(_req, res) {
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')
		res.json({ message: 'выход из системы успешный' })
	}

	async me(req, res) {
		try {
			const email = req.user.email
			const user = await UserService.me(email)
			res.status(201).json({ user: safeUser(user) })
		} catch (err) {
			res.status(500).json({ message: 'сбой в системе', error: err.message })
		}
	}
	async save(req, res) {
		try {
			const [email, lvl, prLvl] = [req.body.email, req.body.lvl, req.body.lvlPr]
			const user = await UserService.save(email, lvl, prLvl)
			res.status(201).json({ result: safeUser(user) })
		} catch (err) {
			res.status(500).json({  message: 'сбой в системе',error: err.message })
		}
	}
	async getusers(req, res){
			try {
				const users = await UserService.getAllUsers()
				res.status(201).json({ result: users.map(el=>safeUser(el))})
			} catch (err) {
				res.status(500).json({  message: 'сбой в системе',error: err.message })
			}
		}
}

module.exports = new UserController()

