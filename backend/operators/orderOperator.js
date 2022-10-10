export const success = (orders, limit = 5) => {
  let list = []

  orders.forEach(e => {
    e.products.forEach(el => {
      list = [...list, el]
    })
  })

  const listOrden = {}
  list.forEach(e => {
    if (!listOrden[e.product]) {
      listOrden[e.product] = {
        product: e.product,
        quantity: e.quantity
      }
    } else {
      listOrden[e.product] = {
        ...listOrden[e.product],
        quantity: listOrden[e.product].quantity + e.quantity
      }
    }
  })

  const result = Object.keys(listOrden).map(e => listOrden[e]).sort((a, b) => b.quantity - a.quantity).splice(0, limit)
  return result
}

export const bestBrand = (orders) => {
  let products = []

  orders.forEach(e => {
    e.products.forEach(el => {
      products = [...products, el]
    })
  })

  const bestBrand = {}

  products.forEach(e => {
    if (!bestBrand[e.product.brand]) {
      bestBrand[e.product.brand] = {
        brand: e.product.brand,
        quantity: e.quantity
      }
    } else {
      bestBrand[e.product.brand] = {
        ...bestBrand[e.product.brand],
        quantity: bestBrand[e.product.brand].quantity + e.quantity
      }
    }
  })

  const result = Object.keys(bestBrand).map(e => bestBrand[e]).sort((a, b) => b.quantity - a.quantity)

  return result
}
