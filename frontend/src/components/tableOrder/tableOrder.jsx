import React from "react"
import { Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const TableOrder = ({order}) => {
  const products = useSelector((state) => state.products.value)

  if(!order || !products) return null

  const items = order?.products?.map(e => {
    const item = products.find(el => el.id === e.product)
    return{
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: e.quantity
    }
  })

  const fecha = new Date(order.createdAt).toUTCString().substring(0,16)

  return(
    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:'2rem',gap:'2rem',alignItems:'center'}}>
      <div>
        <h1>Order #{order.id}</h1>
        <p>{fecha}</p>
      </div>
    <div style={{width:'80%'}}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map( (e, i) =>
          <tr key={e.id}>
            <td>{i+1}</td>
            <td><Link to={`/product/${e.id}`}>{e.name}</Link></td>
            <td>{e.quantity}</td>
            <td>${e.price}</td>
            <td>${Number(e.price)* Number(e.quantity)}</td>
          </tr>
          )}
          <tr>
            <th>Total Amount</th>
            <td></td>
            <td></td>
            <td></td>
            <td>${order.amount}</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default TableOrder