import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  brand: { type: String, required: true },
  procesador: {
    speed: { type: Number, required: true },
    type: { type: String, required: true }
  },
  display: {
    size: { type: Number, required: true },
    resolution: { type: String, required: true }
  },
  camera: {
    front: { type: String, required: true },
    back: { type: String, required: true }
  },
  memory: {
    ram: { type: Number, required: true },
    rom: { type: Number, required: true }
  },
  battery: { type: Number, required: true },
  img: { type: String, required: true },
  category: { type: Array, default: ['smartphone'] },
  price: { type: Number, required: true }
}, { timestamps: true })

productSchema.plugin(uniqueValidator)

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = mongoose.model('Product', productSchema)

export default Product
