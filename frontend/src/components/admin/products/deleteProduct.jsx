import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../../reducers/productsReducer"
import React from "react"

const DeleteProduct = ({id}) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if(window.confirm('Do you want to delete it?')){
      if(window.confirm('Do you really want to delete it?')){
        dispatch(deleteProduct(id))
      }
    }
  }

  return (
    <div style={{color:'red',cursor:'pointer'}} onClick={() => handleDelete()}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  )
}

export default DeleteProduct