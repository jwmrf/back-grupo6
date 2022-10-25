const express = require('express')
const cors = require('cors');
const http = require("http");
const app = express()
const Process = require('./data/process').initProcess
const routes = require('./data/routes').routes
const server = http.createServer({}, app).listen(3000);
app.use(cors({
    origin: '*'
}));
app.use(routes)
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
Process(io)
server.keepAliveTimeout = (60 * 1000) + 1000;
server.headersTimeout = (60 * 1000) + 2000;