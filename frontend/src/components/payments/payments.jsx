import React from "react"
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from './checkoutForm'
import './payments.css'

const stripePromise = loadStripe('pk_test_51LesuYHNbYEEZKbu8GG5id1Pqlsu0uEKQREX84BqliGMoM4lmBL3SV10AQBXX3RPZ9MXjqxceOvqANtpKY3g7GLw00I8ItX7pl');


const Payments = () => {
  const user = useSelector((state) => state.user.value)
  if(!user) return null

  return (
      <Elements stripe={stripePromise}>
          <CheckoutForm user={user}/>
      </Elements>
  )
}

export default Payments