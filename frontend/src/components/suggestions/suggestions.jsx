import React from "react"
import { useSelector } from "react-redux"
import Cards from "../cards"

const Suggestions = ({brand, id}) => {
  const products = useSelector((state) => state.products.value)
  if(!products) return <h1>Loading...</h1>
  const productsBrand = products.filter(e => e.brand === brand && e.id !== id)
  return (
    <div style={{padding:'1rem'}}>
      <h3>More {brand}'s products</h3>
      <div className="container-gallery-responsive">
        {productsBrand.map(e => <Cards key={e.id} item={e} />)}
      </div>
    </div>
  )
}

export default Suggestions