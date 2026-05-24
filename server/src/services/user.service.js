const { set } = require('mongoose')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

class UserService {
	async register(user) {
		try {
			let existing = await User.findOne({ email: user.email })

			if (existing) {
				return { message: 'пользователь с такой почтой уже существует' }
			}

			existing = await User.findOne({ name: user.name })

			if (existing) {
				return { message: 'пользователь с таким именем уже существует' }
			}
			
			const salt = await bcrypt.genSalt(10)
			const hashed = await bcrypt.hash(user.password, salt)
			const user2 = await User.create({ email: user.email, password: hashed, name: user.name, lvl: user.lvl, lvlPr: user.lvlPr  })
			
			return user2
		} catch (err) {
			return { error: err.message }
		}
	}

	async login(email, password) {
		try {
			const user = await User.findOne({ email })
			console.log(user)
			if (!user) {
				return { message: 'пользователь с такой почтой не существует' }
			}

			const match = await bcrypt.compare(password, user.password)

			if (!match) {
				return { message: 'пароли не совпадают'}
			}

			return user
		} catch (err) {
			return { error: err.message }
		}
	}
	async refresh(id){
		try {
		const user = await User.findById(id)
			return user

		} catch (err) {
			return { error: err.message }
		}
	}

	async save(email, lvl, prLvl) {
		try {
			const user = await User.findOne({ email })
			await user.set({
				lvl: lvl,
				lvlPr: prLvl
			})
			await user.save()
			console.log(user)
			return user
		} catch (err) {
			return { error: err.message }
		}
	}
	async me(email){
		try {
			const user = await User.findOne({ email })
			return user
		} catch (err) {
			return { error: err.message }
		}
	}

	async getAllUsers(){
		try {
			const users = await User.find({})
			return users
		} catch (err) {
			return { error: err.message }
		}
	}
}

module.exports = new UserService()
