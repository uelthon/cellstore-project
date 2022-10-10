import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        min: 1,
        max: 3,
        default: 1
      }
    }
  ]
}, { timestamps: true })

cartSchema.plugin(uniqueValidator)

cartSchema.set('toJSON', {
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

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
