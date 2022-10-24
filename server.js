const express = require('express')
const http = require("http");
const app = express()
const Process = require('./data/process').initProcess
const routes = require('./data/routes').routes
const server = http.createServer({}, app).listen(3000);
app.use(routes)
Process()
server.keepAliveTimeout = (60 * 1000) + 1000;
server.headersTimeout = (60 * 1000) + 2000;