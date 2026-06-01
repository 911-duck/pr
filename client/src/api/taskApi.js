import axios from 'axios'

const API_BASE_URL = 'https://pr-9lra.onrender.com'

export const getTask = async (level) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/task/?level=${level}`)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const getAllTasks = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/task/ALL`)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export const getAllPTasks = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/ptask/ALL`)
        console.log(res)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}


export const createPTasks = async (data) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/ptask/CREATE`,data)
        console.log(res)
        return res
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}
