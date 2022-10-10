import { Router } from 'express'
import User from '../models/user.js'
import Cart from '../models/cart.js'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req, res) => {
  const { offset, limit } = req.query
  const auth = req.auth
  if (!auth) return res.status(400).json({ error: 'Not Authorized' })
  if (!auth.isAdmin) {
    const user = await User.findById(auth.id).populate('cart')
    return res.json(user)
  }
  const page = async () => {
    if (offset >= 0 && limit) {
      return await User.find().populate('cart').skip(offset).limit(limit)
    } else if (offset) {
      return await User.find().populate('cart').skip(offset)
    } else if (limit) {
      return await User.find().populate('cart').limit(limit)
    }
    return await User.find().populate('cart')
  }
  const count = await User.find().count()
  const users = await page()
  res.json({
    users,
    count
  })
})

router.get('/stats', async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  const auth = req.auth
  if (!auth) return res.status(400).json({ error: 'Not Authorized' })
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' }
      }
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 }
      }
    }
  ]).sort({ _id: 1 })
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const auth = req.auth
  console.log(auth)
  if (auth.id !== req.params.id && !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const user = await User.findById(req.params.id).populate('cart')
  res.json(user)
})

router.post('/', async (req, res) => {
  const { username, password, address } = req.body
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = {
    username,
    address,
    passwordHash
  }

  const user = await User.create(newUser)
  const cart = await Cart.create({ user: user._id })
  user.cart = cart._id
  await user.save()
  res.json(user)
})

router.put('/:id/status', async (req, res) => {
  const auth = req.auth
  if (!auth || !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const user = await User.findById(req.params.id)
  if (user.isAdmin) return res.status(400).json({ error: 'user admin cannot be disable' })
  user.disable = !user.disable
  await user.save()
  res.json(user)
})

router.put('/:id/admin', async (req, res) => {
  const auth = req.auth
  if (!auth || !auth.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const user = await User.findById(req.params.id)
  if (user.username === 'ejuc95' || auth.id === user.id || user.disable) return res.status(400).json({ error: 'Not Authorized' })
  user.isAdmin = !user.isAdmin
  await user.save()
  res.json(user)
})

export default router
