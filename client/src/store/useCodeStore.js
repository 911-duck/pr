import { create } from 'zustand'
import { getTask, getAllTasks,getAllPTasks, createPTasks } from '../api/taskApi'

export const useCodeStore = create(set => ({
    code: "// your code",
	result: null,
	loading: false,
    error: null,
	tasks: null,
	allTasks: null,
	allPTasks: null,
	currentTask: null,

	myTask:null,

    setCode: async (code) => {
		set({ loading: true })
		try {
			set({ loading: false, code: code})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	setMyTask: async (task) => {
		set({ loading: true })
		try {
			set({ loading: false, myTask: task})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},
	
	setResult: async (result) => {
		set({ loading: true })
		try {
			set({ loading: false, result: result})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	setCurrentTask: async (result) => {
		set({ loading: true })
		try {
			set({ loading: false, currentTask: result})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	getTasks: async (level) => {
		set({ loading: true })
		try {
			const data = await getTask(level)
			console.log(data,level)
			set({ loading: false, tasks: data.data.data})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	getAllTasks: async () => {
		set({ loading: true })
		try {
			const data = await getAllTasks()
			console.log(data)
			set({ loading: false, allTasks: data.data.data})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	getAllPTasks: async () => {
		set({ loading: true })
		try {
			const data = await getAllPTasks()
			console.log(data)
			set({ loading: false, allPTasks: data.data.data})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},
	createPTasks: async (datap) => {
		set({ loading: true })
		try {
			const data = await createPTasks(datap)
			console.log(data)
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	},

	setAllTask: async (arr) => {
		set({ loading: true })
		try {
			set({ loading: false, allTasks: arr})
		} catch (error) {
			set({ loading: false, error: error.message})
		}
	}
}))
