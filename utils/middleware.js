const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  // There are several ways of sending the token from the browser to the server. We will use the Authorization header. The header also tells which authentication scheme is used.
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

module.exports = {
  tokenExtractor,
}
