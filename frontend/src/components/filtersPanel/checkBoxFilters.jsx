import { Form } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCheck } from '../../reducers/pagesReducer'

const CheckBoxFilters = () => {
  const products = useSelector((state) => state.products.value)
  const check = useSelector((state) => state.pages.filters)
  const dispatch = useDispatch()
  if(!products || !check) return <h1>Loading...</h1>

  useEffect(() =>{
    let ele = document.querySelectorAll("#checkbox-products");
    for(let i=0;i<ele.length;i++){
      const value = ele[i].value
      if(check.brand.includes(value)){
      ele[i].checked = true;
      }else{
       ele[i].checked = false
      }
   }
  },[])

  const allBrands = products.reduce( (accArr, valor) => {
    if (accArr.indexOf(valor.brand) < 0) {
      accArr.push(valor.brand);
    }
    return accArr;
  }, []);

  const handleCheck = (e) => {
    if(check.brand.includes(e.target.value)){
      const newBrand = check.brand.filter(el => el !== e.target.value)
      const newState = {
        ...check,
        brand: newBrand
      }
      return dispatch(setCheck(newState))
    }else{
      const newState = {
        ...check,
        brand: [...check.brand, e.target.value ]
      }
    return dispatch(setCheck(newState))
    }
} 

  return (
    <div>
          <h5>Brand</h5>
          { allBrands ? allBrands.map(e =>
          <Form.Check
            type='checkbox'
            id='checkbox-products'
            label={e}
            value={e}
            key={e}
            onChange={handleCheck}
          />
          )
          : null }
    </div>
  )
}

export default CheckBoxFilters