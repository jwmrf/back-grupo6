const  axios  = require('axios');
const api = axios.create({
    baseURL : 'https://api.stackexchange.com/2.3/'
})

module.exports = class Requests {

    getQuestions (sort = 'activity') {
        return api.get(`questions?order=desc&sort=${sort}&site=stackoverflow`)
    }

    getTags (sort = 'popular') {
        return api.get(`tags?order=desc&sort=${sort}&site=stackoverflow`)
    }
}