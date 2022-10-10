import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCheck } from '../../reducers/pagesReducer'
import React, { useEffect } from 'react'

const RadiosFilters = ({values,title,unidad,compare}) => {
  const check = useSelector((state) => state.pages.filters)
  const dispatch = useDispatch()
  if(!check) return <h1>Loading...</h1>;
  useEffect(() =>{
    var radios = document.querySelectorAll(`#radio-products-${title.toLowerCase()}`)
    for(let j=0 ; j<radios.length;j++){
      const value = radios[j].value
      const name = radios[j].name
      if(Number(value) === check[name] ){
        radios[j].checked = true;
      }else{
        radios[j].checked = false
      }
    }
  },[])

  const handleRadio = (e) => {
    const content = e.target
    const name = content.name
    if(content){
      const newState = {
        ...check,
        [name]: Number(content.value)
      }
      return dispatch(setCheck(newState))
    }
  }

  return(
    <div>
          <h5>{title}</h5>
          {values.map(e => 
            <Form.Check   
            key={e}   
            label={`${compare}${e}${unidad}`}
            value={e}
            id={`radio-products-${title.toLowerCase()}`}
            name={title.toLowerCase()}
            type='radio'
            onChange={handleRadio}
            />
            )}
    </div>
  )
}

export default RadiosFilters;