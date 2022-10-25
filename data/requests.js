const  axios  = require('axios');
const api = axios.create({
    baseURL : 'https://api.stackexchange.com/2.3/'
})
module.exports = class Requests {

    getQuestions (sort = 'activity') {
        return api.get(`questions?order=desc&sort=${sort}&site=stackoverflow`)
    }

    getLastQuestionByTag (tag = '') {
        if (!tag) {
            return api.get(`questions?pagesize=1&order=desc&sort=creation&site=stackoverflow`)
        } else {
            return api.get(`questions?pagesize=1&order=desc&sort=creation&tagged=${tag}&site=stackoverflow`)
        }
    }

    getTags (sort = 'popular') {
        return api.get(`tags?order=desc&sort=${sort}&site=stackoverflow`)
    }
}