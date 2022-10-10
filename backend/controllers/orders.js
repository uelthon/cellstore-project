import { Router } from 'express'
import Order from '../models/order.js'
import { success, bestBrand } from '../operators/orderOperator.js'

const router = Router()

router.get('/', async (req, res) => {
  const { offset, limit } = req.query
  const auth = req.auth
  if (!auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const page = async () => {
    if (offset >= 0 && limit) {
      return await Order.find().sort({ createdAt: -1 }).skip(offset).limit(limit)
    } else if (offset) {
      return await Order.find().sort({ createdAt: -1 }).skip(offset)
    } else if (limit) {
      return await Order.find().sort({ createdAt: -1 }).limit(limit)
    } else {
      return await Order.find().sort({ createdAt: -1 })
    }
  }
  const count = await Order.find().count()
  const orders = await page()
  res.json({
    count,
    orders
  })
})

router.get('/bestbrand', async (req, res) => {
  const auth = req.auth
  if (!auth && !auth?.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const orders = await Order.find().populate({
    path: 'products',
    populate: {
      path: 'product',
      select: 'id name brand price'
    }
  }).sort({ createdAt: -1 }).limit(50)
  const result = bestBrand(orders)
  res.json(result)
})

router.get('/success', async (req, res) => {
  const { admin } = req.query
  const auth = req.auth
  if (auth && auth?.isAdmin && admin) {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50)
    const result = success(orders, 50)
    return res.json(result)
  }
  const orders = await Order.find().sort({ createdAt: -1 }).limit(50)
  const result = success(orders)
  res.json(result)
})

router.get('/stats', async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  const auth = req.auth
  if (!auth && !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const data = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount'
      }
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' }
      }
    }
  ]).sort({ _id: 1 })
  res.json(data)
})

router.get('/order/:id', async (req, res) => {
  const auth = req.auth
  if (!auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const order = await Order.findById(req.params.id)
  res.json(order)
})

router.get('/:id', async (req, res) => {
  const auth = req.auth
  if (auth.id !== req.params.id && !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const orders = await Order.find({ user: req.params.id })
  res.json(orders)
})

router.post('/', async (req, res) => {
  const auth = req.auth
  if (!auth) return res.status.apply(400).json({ error: 'Not Authorized' })
  const order = await Order.create(req.body)
  res.json(order)
})

export default router
