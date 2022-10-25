const {range} = require('rxjs');
const {filter, map} = require('rxjs/operators');
const requests = new (require('./requests'));

var lastCreatedQuestionTag = 0

exports.checkData = (data) => {
    try {
        var parsedData = JSON.parse(data)
    } catch (error) {
        var parsedData = null
    }
    if (parsedData) {
        switch (parsedData.type) {
            case 'questions':
                verify = processQuestions(parsedData.data)

                return verify
            case 'questionsTag':
                verify = verifyLastQuestionTag(parsedData.data)

                return verify
            default:
                break;
        }
    }    
}

const polling = (io) => {
    setInterval(async () => {
        var questions = await requests.getLastQuestionByTag('')
        const data = this.checkData(JSON.stringify({type:'questionsTag',data:questions.data.items}))
        
        io.emit('new_question', data);
    }, 60000);
}

const handleConnection = socket => {
    console.log("connection estabilished", socket.id);

    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
}

exports.initProcess = function(io) {
    io.on('connection', handleConnection);

    polling(io);
}

function processQuestions(datas) {
    if(typeof(datas) == 'object') {
        return datas
    } else {
        return false
    }
}

function verifyLastQuestionTag(datas) {
    let size = Object.keys(datas).length;
    let finalData = []
    range(0, size).pipe(
    map(x => datas[x]),
      filter(x => processQuestions(x) !== false),
      filter(x => lastCreatedQuestionTag < x.creation_date)
    )
    .subscribe(data => finalData.push(data));
    if (finalData.length) {
        lastCreatedQuestionTag = finalData[0].creation_date
    }
    return finalData
}
