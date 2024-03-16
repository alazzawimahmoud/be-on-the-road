import axios from "axios"

const client = axios.create({
    baseURL: 'api/',
    timeout: 1000
});

const api = {
    getCategories: async () => {
        return client.get('/data?type=categories').then(data => data.data)
    },
    getQuestions: async (categoryId) => {
        return client.get(`/data?type=questions&categoryId=${categoryId}`).then(data => data.data)
    }
}

export default api