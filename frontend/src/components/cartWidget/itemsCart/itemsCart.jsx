import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { putCart } from "../../../reducers/userReducer";
import { cartParse } from "../../../utils/cartUtils";
import { Link } from "react-router-dom";
import React from "react"
import './itemsCart.css'

const Card = ({product, cart, id}) => {
  const dispatch = useDispatch()

  if(!product || !id || !cart) return null;
  
  const handleCart = () => {
    const newCart = cart.filter(e => e.product !== product.item.id)
    dispatch(putCart(id, newCart))
  }

  return(
    <div className="container-itemsCart-card-item">
    <div className="container-itemsCart-card-body">
      <img src={product.item.img} />
      <div className="container-itemsCart-card-body-details">
        <div>{product.item.name}</div>
        <div>Und: {product.quantity}</div>
        <div className="price-cart">
        <div>price:${product.item.price}</div>
        <div className="eliminated-cart-widget" onClick={handleCart} ><FontAwesomeIcon icon={faCartShopping} size='xs' /></div>
        </div>
      </div>
    </div>
    <div style={{width:'100%',height:'1px', backgroundColor:'#d6eaf8 ', marginBottom:'2px'}}></div>
    </div>
  )
}

const ItemsCart = ({user, linkpay=true}) =>{
    if(!user) return <p>Please Login</p>
    const products = user ? user?.cart?.products : [] ;
    const { cart, total } = cartParse(products) 

    return (
      <div className="container-itemsCart">
        {user ? products.length < 1 ? <p style={{color:'#dc3545'}}>there is not items in your cart</p> : null : null}
        <div className="container-itemsCart-card">
          {cart.map(e => <Card key={e.item.id} product={e} cart={products} id={user.id} />)}
        </div>
        {total > 0 ?
        <div className="container-itemsCart-footer">
          <div>Total: <span style={{color:'#145a32',fontWeight:'bold'}}>${total}</span></div>
          {linkpay ?<Link to='/pay'>Pay</Link> : null}
        </div>
         : null}
      </div>
    )
}

export default ItemsCart