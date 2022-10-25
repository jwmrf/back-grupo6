const {range} = require('rxjs');
const {filter, map} = require('rxjs/operators');
const net = require('net')
var lastCreatedQuestionTag = 0
const handleConnection = socket => {
    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
    socket.on('data', data => {
        let parsedData = JSON.parse(data)
        switch (parsedData.type) {
            case 'questions':
                verify = processQuestions(parsedData.data)
                socket.write(JSON.stringify(verify))
                break;
            case 'questionsTag':
                verify = verifyLastQuestionTag(parsedData.data)
                socket.write(JSON.stringify(verify))
                break;
            default:
                break;
        }
        
    })
}

exports.initProcess = function() {
    const server = net.createServer(handleConnection)
    server.listen(4000, '127.0.0.1')
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
