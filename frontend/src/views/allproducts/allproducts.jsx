import { useSelector, useDispatch } from "react-redux"
import Cards from "../../components/cards"
import { Button, ButtonGroup, Form  } from "react-bootstrap"
import { orderProducts, parseProducts } from "../../utils/operators"
import FiltersPanel from "../../components/filtersPanel"
import Loading from '../loading'
import { setOffSet, setsortProducts } from "../../reducers/pagesReducer"
import './allproducts.css'
import React, { useEffect } from "react"

const AllProducts = () => {
  const products = useSelector((state) => state.products.value)
  const filtersProducts = useSelector((state) => state.pages.filters)
  const offSet = useSelector((state) => state.pages.pagination)
  const sortProducts = useSelector((state) => state.pages.sort)
  const dispatch = useDispatch()

  const data = products ? parseProducts(products, filtersProducts) : []
  const order = data ? orderProducts[sortProducts]([...data]) : []
  const display = order ? order.slice(offSet, offSet + 10) : []
  
  useEffect(() => {
    if(order.length <= 10){
      dispatch(setOffSet(0))
    }
  },[order])

  if(!products) return <Loading />

  const page = {
      init: () => dispatch(setOffSet(0)),
      prev: offSet < 10 ? () => dispatch(setOffSet(0)) : () => dispatch(setOffSet(offSet - 10)),
      next: () => dispatch(setOffSet(offSet + 10)),
      end: () => dispatch(setOffSet(order.length - 10))
  }

  return (
    <div className="container-allproducts" >
        <FiltersPanel />
      <div className="container-allproducts-gallery">
        <div className="container-sort">
          <Form.Select value={sortProducts} onChange={(e) => dispatch(setsortProducts(e.target.value))}>
            <option value='recents'>recents</option>
            <option value='older' >olders</option>
            <option value='lprice'>low prices</option>
            <option value='hprice' >high prices</option>
          </Form.Select>
        </div>
        <div className="container-gallery">{
          display.map(e => <Cards key={e.id} item={e} />)
        }</div>
        <div className="container-allproducts-buttons">
          <ButtonGroup >
            <Button onClick={page.init} disabled={offSet === 0}>Init</Button>
            <Button onClick={page.prev} disabled={offSet === 0} >Prev</Button>
            <Button onClick={page.next} disabled={offSet >= order.length - 10}>Next</Button>
            <Button onClick={page.end} disabled={offSet >= order.length - 10}>End</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}

export default AllProducts