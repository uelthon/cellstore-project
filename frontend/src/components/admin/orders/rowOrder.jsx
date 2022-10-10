import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import userServices from "../../../services/users"

const RowOrder = ({order}) => {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const fetchUser = async () => {
      const user = await userServices.getOne(order.user)
      setUser(user)
    }
    fetchUser()
  }, [order])

  if(!order) return null

  const date = new Date(order.createdAt).toUTCString().substring(0,16)

  return (
    <tr>
      <td><Link to={`/admin/orders/${order.id}`} >{order.id}</Link></td>
      <td>{date}</td>
      <td>{user.username}</td>
      <td>{order.products.length}</td>
      <td style={{color:'green',fontWeight:'bold'}}>${order.amount}</td>
    </tr>
  )
}

export default RowOrder