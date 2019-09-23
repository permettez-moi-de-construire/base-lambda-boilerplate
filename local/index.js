const express = require('express')
const cors = require('cors')
const util = require('util')
const bodyParser = require('body-parser')
const path = require('path')

const {
  lambdaToMiddleware,
  getHttpFunctionsFromSlsOptions
} = require('./local-util')

const httpFunctions = getHttpFunctionsFromSlsOptions(
  path.resolve(__dirname, '..', 'serverless.yml')
)

// create server
const app = express()

// middlewares
app.use(bodyParser.text())

// Welcome page
app.get('/', (req, res) => res.end(`Dev server works (port ${process.env.PORT})`))

// Dynamically bind each lambda
// From serverless.yml
httpFunctions.forEach(httpFunction => {
  app[httpFunction.method](httpFunction.path,
    ...httpFunction.middlewares,
    lambdaToMiddleware(httpFunction.func)
  )
  console.log(`Bound ${httpFunction.path} to ${httpFunction.handlerFileName}.${httpFunction.funcName} (cors: ${!!httpFunction.cors})`)
})

// const router = new express.Router()
// app.use('/', router)

app.listen(process.env.PORT)
console.log(util.format('%i is the magic port', process.env.PORT))
