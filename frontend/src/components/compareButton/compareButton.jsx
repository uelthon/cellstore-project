import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { setItem, removeItem } from "../../reducers/compareReducer";
import { setNoti } from "../../reducers/notiReducer";
import React from "react"

const CompareButton = ({ item, label }) => {
  const compare = useSelector((state) => state.compare.value)
  const dispatch = useDispatch()

  if(!item) return null

  const validation = compare.includes(item)
  
  const handleCompare = () => {
    if(validation){
        dispatch(removeItem(item.id))
        return dispatch(setNoti(['Removed from Compare','danger']))
    }
    if(compare.length >= 3){
      return dispatch(setNoti(['Compare Full','danger']))
    }
    dispatch(setItem(item))
    return dispatch(setNoti(['Added to Compare','success']))
  }

  return (
    <div>
      <Button variant={validation ? 'danger' : 'primary'} size='sm' onClick={handleCompare} >
        <FontAwesomeIcon icon={validation ? faSquareMinus : faSquarePlus} size='xs' /> <span>{label}</span>
      </Button>
    </div>
  )
}

export default CompareButton
