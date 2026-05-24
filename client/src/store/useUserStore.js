import { create } from 'zustand'
import { getAllUsers, getUser, loginUser, logoutUser, postUser, saveUser } from '../api/userApi'

export const useUserStore = create(set => ({
	userName: null,
	userEmail: null,
	userLvl: null,
	userLvlPr: null,
	loading: false,
	error: null,
	allUser: null,
	message:null,
	lvlTable: [
		null,
		"8kyu",
		"7kyu",
		"6kyu",
		"5kyu",
		"4kyu",
		"3kyu",
		"2kyu",
		"1kyu"
	],

	setName: async (name) => {
		set({ loading: true, error: null })
		try {
			set({ userName: name, loading: false })
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	setEmail: async (email) => {
		set({ loading: true, error: null })
		try {
			set({ userEmail: email, loading: false })
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	addUser: async (password, email, name) => {
		set({ loading: true, error: null })
		try {
				const res = await postUser(name, email, password)
				set({ loading: false })
				return res.data
		}
		catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	getUser: async () => {
		set({ loading: true, error: null })
		try {
			const user = await getUser()
			console.log(user)
			return user.data
		}
		catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	loginUser: async (password, email) => {
		set({ loading: true, error: null })
		try {
			console.log(email, password)
			const user = await loginUser(email,password)
			console.log(user)
			return user.data
		}
		catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	logoutUser: async (password, email) => {
		set({ loading: true, error: null })
		try {
			console.log(email, password)
			const user = await logoutUser(email,password)
			return user.data
		}
		catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	getAllUserData: async (user) => {
		set({ loading: true, error: null })
		try {
			console.log(user)
			set({ userEmail: user.email, userName: user.name, userLvl: user.lvl, userLvlPr: user.lvlPr, loading: false })
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	setLvlAndPr: async (lvl, pr, userEmail)=>{
		set({ loading: true, error: null })
		try {
			set({ userLvl: lvl, userLvlPr: pr, loading: false })
			await saveUser(lvl, pr, userEmail)
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	},

	getAllUser: async () =>{
		set({ loading: true, error: null })
		try {
			const users = await getAllUsers()
			console.log(users)
			set({allUser : users.data.result})
		} catch (error) {
			set({ error: error.message, loading: false })
		}
	}
}))
