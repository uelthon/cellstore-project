import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Spinner } from 'react-bootstrap'
import orderServices from '../../../services/orders'
import TableOrders from './tableOrders'

const AdminOrders = () => {
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count , setCount] = useState(0)
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
      setLoading(true)
    const fetchOrders = async () => {
      try{
        const data = await orderServices.getAllOrders(offset)
        setCount(data.count)
        setOrders(data.orders)
        setLoading(false)
      }catch(e){
        console.log(e)
        setLoading(false)
      }
    }
    fetchOrders()
  },[offset])

  return(
    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:'2rem',gap:'2rem',alignItems:'center'}}>
      <h1>Orders</h1>
      <div style={{width:'80%'}}>
       <TableOrders orders={orders} />
      </div>
      {loading ? <Spinner animation='border' variant='primary' role='status' /> : null}
      <ButtonGroup>
        <Button onClick={() => setOffset(offset - 10)} disabled={offset < 10}>
          Prev
        </Button>
        <Button onClick={() => setOffset(offset + 10)} disabled={offset > count - 10}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default AdminOrders