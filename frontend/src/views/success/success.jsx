import React from "react"
import success from '../../statics/success.webp'
import { useNavigate } from 'react-router-dom'
import './success.css'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Success = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value)
  const orders = useSelector((state) => state.orders.userOrders)

  if(!user || orders.length === 0) return navigate('/')

  const order = orders[orders.length - 1]

  if(order){
    setTimeout(() => {
      navigate(`/orders/${order.id}`)
    }, 3000)
  }

  return(
    <div className='container-success'>
        <h1>Pay Success</h1>
       <img height='200px' width='200px' src={success} />
       <h2>Thanks for your purchase</h2>
       <Spinner animation="border" />
       <p>Redirecting to Receipt...</p>
    </div>
  )
}

export default Success