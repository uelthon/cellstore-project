import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  address: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true })

orderSchema.plugin(uniqueValidator)

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.products = returnedObject.products.map(e => {
      return {
        product: e.product,
        quantity: e.quantity
      }
    })
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = mongoose.model('Order', orderSchema)

export default Order
