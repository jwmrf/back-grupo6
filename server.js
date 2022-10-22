const express = require('express')
const app = express()
const Requests = require('./data/requests')
const requests = new Requests()

app.get('/questions',  async function (req, res) {
    var questions = await requests.getQuestions()
    res.send(JSON.stringify(questions.data.items))
})

app.get('/tags',  async function (req, res) {
    var questions = await requests.getQuestions()
    res.send(JSON.stringify(questions.data.items))
})

app.listen(3000)