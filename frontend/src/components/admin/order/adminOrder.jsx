import React,{ useState, useEffect } from "react"
import { useMatch } from "react-router-dom"
import orderServices from "../../../services/orders"
import Loading from "../../../views/loading"
import TableOrder from "../../tableOrder"

const AdminOrder = () => {
  const [order, setOrder] = useState(null)
  const match = useMatch('/admin/orders/:id')
  const id = match.params.id

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await orderServices.getOneOrder(id)
      setOrder(order)
    }
    fetchOrder()
  }, [id])

  if(!order) return <Loading />

  return <TableOrder order={order} />
   
}

export default AdminOrder