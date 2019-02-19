'use strict'

exports.http = (req, res) => {
  const payload = req.body.toString()
  res
    .status(200)
    .send(payload)
}

exports.event = (event, callback) => {
  callback()
}
