import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import Modals from "../../modals/modals"
import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateProduct } from "../../../reducers/productsReducer"

const ChangePrice = ({id, name}) => {
  const [show, setShow] = useState(false)
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      price: Number(price)
    }
    dispatch(updateProduct(id,body))
    setShow(false)
  }

  return (
    <Modals 
      btnTitle={<FontAwesomeIcon icon={faPenToSquare} />} 
      head={`Change Price of ${name}`}
      show={show}
      setShow={setShow}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          /><br/>
          <Button type='submit'>Submit</Button>
        </Form>
    </Modals>
  )
}

export default ChangePrice