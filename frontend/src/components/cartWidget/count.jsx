import React from "react"
const Count = ({user}) => {
  
  const products = user ? user.cart.products : null ;
  const items = products ? products.reduce((prev,curr) => Number(prev) + Number(curr.quantity) ,0) : 0;
   const style = {
    backgroundColor:'#dc3545',
    color:'#fff',
    borderRadius:'50%',
    position:'absolute',
    top:'-12px',
    right: '-5px',
    width:'20px',
    height:'20px',
    display:'grid',
    placeItems:'center',
  }
    return(
      <div style={style}>
        {items}
      </div>
    )
    }
  
  export default Count