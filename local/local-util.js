const reqToLambdaEvent = req => ({
  // resource: '/',
  resource: null, // Would be set
  // path: '/',
  path: null, // Would be set
  httpMethod: req.method,
  headers: req.headers,
  queryStringParameters: req.query.length ? req.query : null,
  pathParameters: req.params.length ? req.params : null,
  stageVariables: null,
  requestContext: {
    // path: '/dev/',
    path: null, // Would be set
    // accountId: '125002137610',
    accountId: null, // Would be set
    // resourceId: 'qdolsr1yhk',
    resourceId: null, // Would be set
    // stage: 'dev',
    stage: null, // Would be set
    // requestId: '0f2431a2-6d2f-11e7-b75152aa497861',
    requestId: null, // Would be set
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      // apiKey: '',
      apiKey: null, // Would be set
      // sourceIp: '50.129.117.14',
      sourceIp: null, // Would be set
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: req.get('User-Agent'),
      user: null
    },
    // resourcePath: '/',
    resourcePath: null, // Would be set
    httpMethod: req.method,
    // apiId: 'j3azlsj0c4'
    apiId: null, // Would be set
  },
  body: req.body,
  isBase64Encoded: false
})

const handleLambdaResultWithRes = (lambdaPromise) => (req, res, next) => {
  return Promise.resolve(lambdaPromise)
    .then(result => {
      res.status(result.statusCode || 200)
      Object.entries(result.headers).forEach(([key, value]) => {
        res.set(key, value)
      })
      res.type('json')
      res.send(result.body)
    })
    .catch(err => {
      console.log(err)
      next(err)
      // TODO: handle
    })
}

const lambdaToMiddleware = (lambda) => (
  (req, res, next) => {
    const event = reqToLambdaEvent(req)

    handleLambdaResultWithRes(lambda(event))(req, res, next)
  }
)

module.exports = {
  reqToLambdaEvent,
  handleLambdaResultWithRes,
  lambdaToMiddleware
}
