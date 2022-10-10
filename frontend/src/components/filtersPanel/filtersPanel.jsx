import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { setCheckReset } from '../../reducers/pagesReducer'
import CheckBoxFilters from './checkBoxFilters'
import RadiosFilters from "./radiosFilters"
import './filtersPanel.css'

const FiltersPanel = () => {
  const products = useSelector((state) => state.products.value)
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()

  if(!products) return <h1>Loading...</h1>
  
  const resetAll = () => {
    dispatch(setCheckReset())
    var ele = document.querySelectorAll("input");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
  }

  return (
    <div className="container-allproducts-filters">
    <Button className="btn-filters" onClick={() => setToggle(!toggle)}>
      <FontAwesomeIcon icon={faFilter} /> Filters
    </Button>
    <div className={`container-filterspanel ${toggle ? 'showFiltersPanel' : ''}`}>
      <div className='container-filterspanel-checks'>
        <div className="container-filterspanel-title">
          <div className="filterspanel-title">
            <h3>Filters</h3>
            <div className="closed-filterspanel" onClick={() => setToggle(!toggle)} >
              <FontAwesomeIcon icon={faXmark} size='xl' />
            </div>
          </div>
          <h6 onClick={resetAll}>reset</h6>
        </div>
        <div className="container-filterspanel-form">
          <CheckBoxFilters/>
          <RadiosFilters values={[300,600,900,1100,1400]} title='Price' unidad='$' compare='<=' />
          <RadiosFilters values={[4,6,8,10]} title='Ram' unidad='gb' compare='>=' />
          <RadiosFilters values={[64,128,256,512]} title='Rom' unidad='gb' compare='>=' />
          <RadiosFilters values={[5,6,6.5,7]} title='Display' unidad='"' compare='<=' />
          <RadiosFilters values={[4000,5000,6000]} title='Battery' unidad='mAh' compare='>=' />
        </div>
      </div>
    </div>
    </div>
  )
}

export default FiltersPanel