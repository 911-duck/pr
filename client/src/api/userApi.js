import axios from 'axios'

const API_BASE_URL = 'https://loving-creativity-production-86a4.up.railway.app'

const api = axios.create({
	baseURL: `${API_BASE_URL}`,
	withCredentials: true
})

let isRefreshing = false
let failedQueue = []

const processQueue = error => {
	failedQueue.forEach(p => (error ? p.reject(error) : p.resolve()))
}

api.interceptors.response.use(
	response => response,
	async error => {
		const original = error.config

		if (
			error.response?.status === 401 &&
			!original._retry &&
			!original.url.includes('/auth/refresh') &&
			!original.url.includes('/auth/login')
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(() => api(original))
					.catch(err => Promise.reject(err))
			}

			original._retry = true
			isRefreshing = true

			try {
				await api.post('/auth/refresh')
				processQueue(null)
				return api(original)
			} catch (refreshError) {
				processQueue(refreshError)
				window.dispatchEvent(new Event('auth:logout'))
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export const getUser = async () => {
    try {
        const res = await api.get(`/user/me`)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const postUser = async (name, email, password) => {
    try {
        const obj = {
            email: email,
            name: name,
            password: password,
            lvl: 1,
            lvlPr: 0
        }

        const res = await api.post(`/user/register`, obj)

        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const loginUser = async (email, password) => {
    try {
        const obj = {
            email: email,
            password: password,
        }

        const res = await api.post(`/user/login`, obj)

        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const res = await api.post(`/user/logout`)
        return res.data
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}


export const saveUser = async (lvl,pr,email) => {
    try {
        const obj = {
            email: email,
            lvl: lvl,
            lvlPr: pr
        }
console.log(obj)
        const res = await api.post(`/user/save`, obj)
        console.log(res)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const getAllUsers = async () =>{
    try {
        const res = await api.get(`/user/allUser`)
        console.log(res)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}


export const apiRefresh = async () => {
	 try {
        const res = await api.get(`/user/refresh`)
        console.log(res)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}


