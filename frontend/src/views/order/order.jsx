import React from "react"
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import NotFound from "../notFound";
import Receipt from "../../components/receipt/receipt";

const Order = () => {
  const user = useSelector((state) => state.user.value)
  const orders = useSelector((state) => state.orders.userOrders)
  const match = useMatch('/orders/:id')
  const id = match.params.id

   if(!user || orders.length === 0 || !id) return <NotFound />;

   const order = orders.find(e => e.id === id)
   
   if(!order) return <NotFound />

  return <Receipt order={order} />

}

export default Order