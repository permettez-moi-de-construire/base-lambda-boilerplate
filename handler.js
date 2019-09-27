'use strict'

const { doSomething } = require('./src/sample')

// Required for CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

const first = async event => {
  const result = doSomething(6)

  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
    },
    body: JSON.stringify(
      result,
      null,
      2
    )
  }
}

const second = async event => {
  return {
    statusCode: 200,
    headers: {
      ...corsHeaders
    },
    body: event.body
  }
}

module.exports = {
  first,
  second
}
