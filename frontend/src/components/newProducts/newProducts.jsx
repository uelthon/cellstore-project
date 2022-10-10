import React from "react"
import { useSelector } from "react-redux"
import Cards from '../cards'
import Loading from "../../views/loading"

const NewProducts = () => {
  const products = useSelector((state) => state.products.value)
  if(!products) return <Loading />

  const last = products.slice(0,5)

  return(
    <div style={{padding:'1rem'}}>
      <h3>New Products</h3>
      <div className="container-gallery-responsive">
        {last.map(e => <Cards key={e.id} item={e} />)}
      </div>
    </div>
  )
}
export default NewProducts