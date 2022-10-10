import React from "react"
import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import NotFound from "../notFound"
import CartButton from "../../components/cartButton"
import Suggestions from "../../components/suggestions"
import CompareButton from "../../components/compareButton"
import Loading from '../loading'
import './product.css'

const Product = () => {
  const products = useSelector((state) => state.products.value)
  const match = useMatch('/product/:id')
  const id = match.params.id
  if(!products || !match) return <Loading />
  const product = products?.find(e => e.id === id) || null;

  return (
    <div style={{padding:'2rem'}}>
      {product ?
      <div>
      <div className="container-product">
        <div className="container-product-img" >
          <img src={product.img} />
        </div>
        <div className="container-details">
          <h1>{product.name}</h1>
          <div>
            <div>Brand: {product.brand}</div>
            <div>Processor: {product.procesador.type} {product.procesador.speed}Ghz</div>
            <div>Display: {product.display.size}" {product.display.resolution}pixels</div>
            <div>Back Camera: {product.camera.back}</div>
            <div>Front Camera: {product.camera.front}</div>
            <div>Ram: {product.memory.ram}Gb</div>
            <div>Storage: {product.memory.rom}Gb</div>
            <div>Battery: {product.battery}</div>
          </div>
          <div>
            <h3>Price: ${product.price}</h3>
            <CartButton id={product.id} /> <br/>
            <CompareButton item={product} label='Compare' />
          </div>
        </div>
      </div>
      <Suggestions brand={product.brand} id={product.id} />
      </div>
      : null}
      {!product ? <NotFound />  : null }
    </div>
  )
}

export default Product