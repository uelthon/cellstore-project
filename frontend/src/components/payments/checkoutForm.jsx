import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import payServices from '../../services/payServices';
import CardSection from './cardSection';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cartParse } from '../../utils/cartUtils';
import { setNewOrder } from '../../reducers/ordersReducer';
import orderServices from '../../services/orders';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNoti } from '../../reducers/notiReducer';

const CheckoutForm = ({user}) => {
  const [address, setAddress] = useState(user.address || '')
  const [loading, setLoading] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if(!user) return null
  const cart = user.cart
  const products = cart.products
  const { total } = cartParse(products)
  const newOrder = {
    user: user.id,
    products,
    amount: total,
    address,
    status: "success"
  }
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (elements == null) {
      return;
    }
    
      const data = await  payServices.payOut({
        amount: total*100,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.username,
          },
        }
      });

      if (result.error) {
        console.log(result.error.message);
        dispatch(setNoti([result.error.message, 'danger']))
        setLoading(false)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const order = await orderServices.createOrder(newOrder)
          dispatch(setNewOrder(order))
          setAddress('')
          setLoading(false)
          navigate('/success')
        }
      }
    };

  return (
    <form className='container-form-payments' onSubmit={handleSubmit}>
      Address:
      <input 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        className='payments-inputs' 
        id='address-pay'
        type='text' 
        placeholder='Address'
        required
      />
      Credit Card:
      <CardSection />
      <Button variant='success' type="submit" disabled={!stripe || !elements || products.length === 0}>
        {!loading ? 'Pay' : <Spinner  animation="border" variant="secondary" />}
      </Button>
    </form>
  );
};

export default CheckoutForm