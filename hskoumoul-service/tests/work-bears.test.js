const {
  describe,
  it
} = require('mocha')

const assert = require('assert')

const workBears = require('../src/works-bears')

describe('workBears function', function() {
  it('Should\'nt throw', function() {
    const payloadBear = {
      birthDate: '1991-01-04T00:00:00'
    }

    workBears(payloadBear)
  })

  it('Should return 29', function() {
    const payloadBear = {
      birthDate: '1991-01-04T00:00:00'
    }

    const age = workBears(payloadBear)

    assert.strictEqual(age, 28)
  })

  it('Should throw when bear is null', function() {
    const payloadBear = null

    const workingBear = workBears.bind(null, payloadBear)
    assert.throws(workingBear)
  })

  it('Should throw when birthDate is not here', function() {
    const payloadBear = {
      foo: 'bar'
    }

    const workingBear = workBears.bind(null, payloadBear)
    assert.throws(workingBear)
  })

  it('Should throw when birthDate is not a string', function() {
    const payloadBear = {
      birthDate: 3
    }

    const workingBear = workBears.bind(null, payloadBear)
    assert.throws(workingBear)
  })
})
