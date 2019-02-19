const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const util = require('util')

const workBears = require('./src/works-bears')

// create server
const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/bear', function (req, res) {
  const bear = req.body
  const age = workBears(bear)

  res.json(age)
})

// const router = new express.Router()
// app.use('/', router)

app.listen(process.env.PORT)
console.log(util.format('%i is the magic port', process.env.PORT))
