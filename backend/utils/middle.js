
import jwt from 'jsonwebtoken'

export const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    request.auth = jwt.verify(request.token, 'supersecret')
  } else {
    request.token = null
  }
  next()
}

export const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

export const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ error: 'unknown endpoint' })
  next()
}

export const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'username already exists' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}
