'use strict'

const workBear = require('./src/works-bears')

exports.first = (req, res) => {
  const bear = req.body

  const age = workBear(bear)
  const resAsString = JSON.stringify(age)

  res
    .status(200)
    .send(resAsString)
}

exports.event = (event, callback) => {
  callback()
}
