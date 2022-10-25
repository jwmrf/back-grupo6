const express = require('express')
const http = require("http");
const app = express()
const Process = require('./data/process').initProcess
const routes = require('./data/routes').routes
const server = http.createServer({}, app).listen(3000);
app.use(routes)
Process()