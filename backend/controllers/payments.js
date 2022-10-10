import * as dotenv from 'dotenv'
import { Router } from 'express'
import Stripe from 'stripe'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_KEY)
const router = Router()

router.post('/', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd'
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
})

export default router
