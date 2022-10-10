import NotFound from '../notFound'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NotHistory from './notHistory'
import React, { useState } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

const Orders = () => {
  const user = useSelector((state) => state.user.value)
  const orders = useSelector((state) => state.orders.userOrders)
  const [ offset, setOffset ] = useState(0)
  const navigate = useNavigate()

  if(!user) return <NotFound />;
  if(orders.length === 0) return <NotHistory />

  const display = orders.slice(offset, offset + 10)

  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:'2rem',gap:'1rem',alignItems:'center', paddingBottom:'2rem'}}>
      <h1>Shopping history</h1><br/>
      <div style={{width:'80%'}}>
      <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Number of Items</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
      {display.map((e, i) =>{
        const date = new Date(e.createdAt);
        const items = e.products.reduce((prev, curr) => prev + curr.quantity, 0)
        return(<tr key={e.id} 
                  onClick={() => navigate(`/orders/${e.id}`)} 
                  style={{cursor:'pointer'}}
                >
                <td>{i+1}</td>
                <td>{date.toUTCString().substring(0,16)}</td>
                <td>{items}</td>
                <td>${e.amount}</td>
              </tr>)
      })}
      </tbody>
    </Table>
    <p>* Click on order for more details</p>
    </div>
    <ButtonGroup>
        <Button onClick={() => setOffset(offset - 10)} disabled={offset < 10}>
          Prev
        </Button>
        <Button onClick={() => setOffset(offset + 10)} disabled={offset > orders.length - 10}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Orders
