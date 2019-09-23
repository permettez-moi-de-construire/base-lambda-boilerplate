const express = require('express')
const cors = require('cors')
const util = require('util')
const bodyParser = require('body-parser')

const { lambdaToMiddleware } = require('./local-util')

const lambdas = require('../handler')

// create server
const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.text())

app.get('/', (req, res) => res.end(`Dev server works (port ${process.env.PORT})`))
app.get('/first', lambdaToMiddleware(lambdas.first))
app.post('/second', lambdaToMiddleware(lambdas.second))

// const router = new express.Router()
// app.use('/', router)

app.listen(process.env.PORT)
console.log(util.format('%i is the magic port', process.env.PORT))
