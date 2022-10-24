const router = require('express').Router()
const requests = new (require('./requests'))

const net = require('net')
const client = new net.Socket()
client.connect(4000, 'localhost', () => {

})
router.get('/questions',  async function (req, res) {
    var questions = await requests.getQuestions()
    client.write(JSON.stringify(questions.data.items))
    client.on('data', data => {
        res.end(data)
    })

})

router.get('/tags',  async function (req, res) {
    var questions = await requests.getQuestions()
    res.send(JSON.stringify(questions.data.items))
})

exports.routes = router;