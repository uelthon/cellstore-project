import { Router } from 'express'
import Product from '../models/product.js'

const router = Router()

router.get('/', async (req, res) => {
  const { last, offset, limit } = req.query
  const products = last
    ? await Product.find().sort({ createdAt: -1 }).limit(5)
    : (offset && limit) || (Number(offset) === 0 && limit)
        ? await Product.find().sort({ createdAt: -1 }).skip(offset).limit(limit)
        : offset || Number(offset) === 0
          ? await Product.find().sort({ createdAt: -1 }).skip(offset)
          : limit
            ? await Product.find().sort({ createdAt: -1 }).limit(limit)
            : await Product.find().sort({ createdAt: -1 })
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.json(product)
})

router.post('/', async (req, res) => {
  const auth = req.auth
  if (!auth || !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const body = req.body
  const product = await Product.create(body)
  res.json(product)
})

router.put('/:id', async (req, res) => {
  const auth = req.auth
  const id = req.params.id
  const body = req.body
  if (!auth || !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const product = await Product.findByIdAndUpdate(id, body, { new: true })
  res.json(product)
})

router.delete('/:id', async (req, res) => {
  const auth = req.auth
  if (!auth || !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  await Product.findByIdAndRemove(req.params.id)
  res.status(200).end()
})

export default router
