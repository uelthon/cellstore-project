import React from "react"
import { useSelector } from "react-redux"
import Cards from "../cards"
import Loading from '../../views/loading'
import './bestSellers.css'

const BestSellers = () => {
const products = useSelector((state) => state.products.value)
const best = useSelector((state) => state.orders.bestSellers)
 
if(!products || !best) return <Loading />

const last = best.map(e => {
  const data = products.find(el => el.id === e.product)
  return data
})


  return(
    <div className="container-bestSellers">
      <h3>Best Sellers</h3>
      <div className="container-gallery-responsive">
        {last.map(e => <Cards key={e.id} item={e} />)}
      </div>
    </div>
  )
}

export default BestSellers