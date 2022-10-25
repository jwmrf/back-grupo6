const router = require('express').Router()
const requests = new (require('./requests'))
const Verify = require('./process').checkData;

router.get('/questions',  async function (req, res) {
    let sort = req.query.sort ? req.query.sort : 'activity'
    var questions = await requests.getQuestions(sort)
    const verified = Verify(JSON.stringify({type:'questions',data:questions.data.items}));
    
    res.send(verified);
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
                res.send(data)
            })
        }, 60000)
    }

    polling()
})

router.get('/questionByTagNormal',  async function (req, res) {
    let tag = req.query.tag ? req.query.tag : ''

    var questions = await requests.getLastQuestionByTag(tag)
    
    res.send(JSON.stringify({type:'questionsTag',data:questions.data.items}))
})

exports.routes = router;