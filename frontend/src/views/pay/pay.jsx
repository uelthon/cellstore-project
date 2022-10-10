import React from "react"
import ItemsCart from "../../components/cartWidget/itemsCart";
import Payments from '../../components/payments'
import { useSelector } from "react-redux";
import './pay.css'
import { useNavigate } from "react-router-dom";

const Pay = () => {
 const user = useSelector((state) => state.user.value)
 const navigate = useNavigate()
  
  if(!user) return navigate('/')

  return(
    <div className="container-card-pay">
      <div className="container-card-pay-item">
        <ItemsCart user={user} linkpay={false} />
        <Payments />
      </div>
    </div>
  )
}

export default Pay