import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './receipt.css'

function Receipt({order}) {
  const products = useSelector((state) => state.products.value)

  if(!order || !products) return null

  const items = order?.products?.map(e => {
    const item = products.find(el => el.id === e.product)
    return{
      id: item.id,
      name: item.name,
      img: item.img,
      brand: item.brand,
      price: item.price,
      quantity: e.quantity
    }
  })

  const date = new Date(order.createdAt).toUTCString().substring(0,16)

  return (
    <div className='container-receipt'>
      <div className='header-receipt'>
        <div className='title-receipt'>
          <h1>Receipt</h1>
          <h2>${order.amount}</h2>
        </div>
        <div className='desc-receipt'>
          <p>{date}</p>
          <p>order ID {order.id}</p>
        </div>
      </div>
      <div className="body-receipt">
        <Table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>QNTY</th>
              <th>UNIT</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {items?.map(e => 
              <tr key={e.id}>
                <td style={{display:'flex',alignItems:'flex-start', gap:'0.375rem'}}>
                  <img width='50px' height='50px' style={{objectFit:'contain'}} src={e.img} />
                  <div>
                    <strong>{e.name}</strong>
                    <p>{e.brand}</p>
                  </div>
                </td>
                <td>
                  <strong style={{color:'#919ca7'}}>{e.quantity}</strong>
                </td>
                <td>
                 <strong style={{color:'#919ca7'}}>${e.price}</strong>
                </td>
                <td>
                <strong style={{color:'#2fc099'}}>${e.price * e.quantity}</strong>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="footer-receipt">
          <div className='footer-tables'>
          <Table>
            <thead>
              <tr>
                <th>BILLING ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{color:'#919ca7'}}>{order.address}</td>
              </tr>
            </tbody>
          </Table>
          </div>
          <div className='footer-tables'>
          <Table>
            <tbody>
              <tr>
                <th>SUBTOTAL</th>
                <td><strong style={{color:'#919ca7'}}>${order.amount}</strong></td>
              </tr>
              <tr>
                <th>TAXES</th>
                <td><strong style={{color:'#919ca7'}}>$0 &#128512;</strong></td>
              </tr>
              <tr>
                <th>TOTAL</th>
                <td><strong style={{color:'#2fc099'}}>${order.amount}</strong></td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt