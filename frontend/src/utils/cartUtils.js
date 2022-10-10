import { useSelector } from "react-redux"

export const cartParse = (products) => {
  const items = useSelector((state) => state.products.value)
  if(!products || !items) return;
  const cart = products.map(e => {
    const item = items.find(el => e.product === el.id )
    return {
      item,
      quantity: e.quantity
    }
  })

  const total = cart.reduce((prev, curr) => prev + curr.item.price*curr.quantity, 0)

  return{
    cart,
    total
  }

}