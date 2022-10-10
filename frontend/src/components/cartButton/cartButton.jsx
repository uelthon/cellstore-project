import { Form, Button, Spinner, Tooltip, OverlayTrigger   } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { putCart } from '../../reducers/userReducer'
import { setNoti } from '../../reducers/notiReducer'

const CartButton = ({id}) => {
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state) => state.user.value)
  const products = user?.cart.products
  const dispatch = useDispatch()

  const include = products?.find(e => e.product === id)

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {include ? 'Remove from cart' :'Add to cart'}
    </Tooltip>
  );

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newItem = {
      product: id,
      quantity: Number(quantity)
    }
    if(!include){
      const bodyProducts = [
        ...products,
        newItem
      ]
      dispatch(putCart(user.id, bodyProducts))
      dispatch(setNoti(['Added to Cart','success']))
    }else{
      const body = products.filter(e => e.product !== id) 
      dispatch(putCart(user.id, body))
      dispatch(setNoti(['Removed from the Cart','danger']))
    }
  }

  return(
    <Form style={{display:'flex', alignItems:'center', gap:'1rem' }} onSubmit={handleSubmit}>
      <OverlayTrigger
      placement="top"
      delay={{ show: 0, hide: 100 }}
      overlay={renderTooltip}
      >
        <Button type='submit' variant={include ?'danger' : 'primary'} disabled={!user} >
          <FontAwesomeIcon icon={faCartShopping} size='sm' />
        </Button>
      </OverlayTrigger>
      <Form.Control
        type='number'
        value={quantity}
        max='3'
        min='1'
        style={{maxWidth:'274px'}}
        onChange={(e) => setQuantity(e.target.value)}
        required
        disabled={!user || include}
      />
    </Form>
  )
}

export default CartButton