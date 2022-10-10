import { Router } from 'express'
import Cart from '../models/cart.js'

const router = Router()

router.get('/', async (req, res) => {
  const auth = req.auth
  if (!auth) return res.status(400).json({ error: 'Not Authorized' })
  if (!auth.isAdmin) {
    const userCart = await Cart.findOne({ user: auth.id })
    return res.json(userCart)
  }
  const carts = await Cart.find()
  res.json(carts)
})

router.get('/:id', async (req, res) => {
  const auth = req.auth
  if (auth.id !== req.params.id && !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const cart = await Cart.findOne({ user: req.params.id })
  res.json(cart)
})

router.put('/:id', async (req, res) => {
  const auth = req.auth
  const body = req.body
  const id = req.params.id
  if (!auth || auth.id !== id) return res.status(400).json({ error: 'Not Authorized' })
  const cart = await Cart.findOneAndUpdate({ user: id }, body, { new: true })
  res.json(cart)
})

router.delete('/:id', async (req, res) => {
  const auth = req.auth
  const body = req.body
  const id = req.params.id
  if (!auth || auth.id !== id) return res.status(400).json({ error: 'Not Authorized' })
  const cart = await Cart.findOneAndUpdate({ user: id }, body, { new: true })
  res.json(cart)
})

export default router
