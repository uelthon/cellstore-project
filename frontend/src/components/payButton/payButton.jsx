import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import './payButton.css'

const PayButton = () => {
  const user = useSelector((state) => state.user.value)
  const products = user?.cart.products
  const location = useLocation()
  const navigate = useNavigate()

  if(!user || products.length === 0 || location.pathname === '/pay' || location.pathname === '/success') return null;

  return (
    <div onClick={() => navigate('/pay')} className="container-paybutton">
      <div>
      <FontAwesomeIcon icon={faCreditCard} size='sm' />
      </div>
    </div>
  )
}

export default PayButton