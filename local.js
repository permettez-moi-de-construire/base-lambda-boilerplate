const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const util = require('util')

const lambdas = require('./index')

// create server
const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/first', lambdas.first)

// const router = new express.Router()
// app.use('/', router)

app.listen(process.env.PORT)
console.log(util.format('%i is the magic port', process.env.PORT))
