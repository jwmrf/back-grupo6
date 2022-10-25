const router = require('express').Router()
const requests = new (require('./requests'))

const net = require('net')
const socketQuestion = new net.Socket()
socketQuestion.connect(4000, 'localhost', () => {})
router.get('/questions',  async function (req, res) {
    let sort = req.query.sort ? req.query.sort : 'activity'
    var questions = await requests.getQuestions(sort)
    socketQuestion.write(JSON.stringify({type:'questions',data:questions.data.items}))
    socketQuestion.on('data', data => {
        res.end(data)
    })
})

router.get('/tags',  async function (req, res) {
    let sort = req.query.sort ? req.query.sort : 'popular'
    var questions = await requests.getTags(sort)
    res.send(JSON.stringify({type:'questions',data:questions.data.items}))
})

router.get('/questionByTag',  async function (req, res) {
    let tag = req.query.tag ? req.query.tag : ''

    const polling = () => {
        setInterval(async () => {
            var questions = await requests.getLastQuestionByTag(tag)
            socketQuestion.write(JSON.stringify({type:'questionsTag',data:questions.data.items}))
            socketQuestion.on('data', data => {
                res.end(data)
            })
        }, 5000)
    }

    polling()
})

exports.routes = router;