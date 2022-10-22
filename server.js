const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Projeto Grupo 6')
})

app.listen(3000)