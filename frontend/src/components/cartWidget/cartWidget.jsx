import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Count from './count'
import { useSelector } from 'react-redux'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import ItemsCart from './itemsCart'
import './cartWidget.css'

const CartWidget = () => {
  const user = useSelector((state) => state.user.value)


  return (
    <div className='container-cartWidget'>
      <Count user={user} />
      <OverlayTrigger
          trigger="click"
          key='bottom'
          placement='bottom'
          overlay={
            <Popover id={'popover-positioned-bottom'}>
              <Popover.Header as="h3">Cart</Popover.Header>
              <Popover.Body>
                <ItemsCart user={user} />
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="primary"><FontAwesomeIcon icon={faCartShopping} size='xl'  /></Button>
        </OverlayTrigger>
    </div>
  )
}

export default CartWidget