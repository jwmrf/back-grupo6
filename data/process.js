const net = require('net')
const handleConnection = socket => {
    socket.on('error', (err) => {
            console.log("Qualquer erro que possa dar por desconexão ou problemas no socket.")
        }
    )
    socket.on('data', data => {
        let parsedData = JSON.parse(data)
        let verify = processQuestions(parsedData)
        socket.write(JSON.stringify(verify))
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
        return []
    }
}
