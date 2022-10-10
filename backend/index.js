import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'express-async-errors'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import productsRouter from './controllers/products.js'
import cartsRouter from './controllers/carts.js'
import orderService from './controllers/orders.js'
import paymentService from './controllers/payments.js'
import { errorHandler, unknownEndpoint, requestLogger, tokenExtractor } from './utils/middle.js'
import path from 'path'
dotenv.config()
const __dirname = path.resolve()

console.log('mongoDB connecting...')
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('mongoDB connected :)'))
  .catch((err) => console.log(err))

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(tokenExtractor)
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/orders', orderService)
app.use('/api/payments', paymentService)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`sever connect to port ${PORT}`)
})
