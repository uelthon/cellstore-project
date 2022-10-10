import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Button } from "react-bootstrap";
import { productParse } from "../../../utils/productUtils";
import { setNewProduct } from "../../../reducers/productsReducer";
import { useDispatch } from "react-redux";
import Modals from "../../modals/modals";

const AddProducts = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [ show, setShow ] = useState(false)
  const dispatch = useDispatch()

  const messages = {
    req: 'This field is required'
  }

  const onSubmit = async (userInfo) => {
    const product = await productParse(userInfo)
    dispatch(setNewProduct(product, setShow))
    console.log(product)
  }

  return (
    <Modals btnTitle={<FontAwesomeIcon icon={faPlus} />} head='Add Product' show={show} setShow={setShow}>
      <Form style={{display:'flex',flexDirection:'column', gap:'1rem'}} onSubmit={handleSubmit(onSubmit)}>
        <div style={{display:'flex',flexDirection:'column', gap:'1rem', maxHeight:'50vh',overflow:'auto',scrollbarWidth:'thin', paddingRight:'1rem',paddingLeft:'1rem'}}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control {...register("name",{required: messages.req})} name="name" type="text" placeholder='name' />
          {errors.name && errors.name.message}
        </Form.Group>
        <Form.Group>
          <Form.Label>Brand:</Form.Label>
          <Form.Control {...register("brand",{required: messages.req})} name="brand" type="text" placeholder='brand'/>
          {errors.brand && errors.brand.message}
        </Form.Group>
        <InputGroup>
          <InputGroup.Text>Processor:</InputGroup.Text>
          <Form.Control {...register("speed",{required: messages.req})} name="speed" step='.01' type="number"placeholder='speed' />
          <Form.Control {...register("type",{required: messages.req})} name="type" type="text" placeholder='type'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Display:</InputGroup.Text>
          <Form.Control {...register("size",{required: messages.req})} name="size" type="number" step='.01'  placeholder='size' />
          <Form.Control {...register("resolution",{required: messages.req})} name="resolution" placeholder='resolution' type="text"/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Cameras:</InputGroup.Text>
          <Form.Control {...register("front",{required: messages.req})} name="front" placeholder='front' type="text"/>
          <Form.Control {...register("back",{required: messages.req})} name="back" placeholder='back' type="text"/>
        </InputGroup>
        <InputGroup>
        <InputGroup.Text>Memory:</InputGroup.Text>
          <Form.Control {...register("ram",{required: messages.req})} name="ram" placeholder='ram' step='.01' type="number"/>
          <Form.Control {...register("rom",{required: messages.req})} name="rom" placeholder='rom' step='.01' type="number"/>
        </InputGroup>
        <Form.Group>
          <Form.Label>Battery:</Form.Label>
          <Form.Control {...register("battery",{required: messages.req})} name="battery" placeholder='battery' type="number" step='.01'/>
          {errors.battery && errors.battery.message}
        </Form.Group>
        <Form.Group>
          <Form.Label>Image:</Form.Label>
          <Form.Control {...register("img",{required: messages.req})} name="img" placeholder='img-url' type="text"/>
          {errors.img && errors.img.message}
        </Form.Group>
        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control {...register("price",{required: messages.req})} name="price" placeholder='price' type="number" step='.01'/>
          {errors.price && errors.price.message}
        </Form.Group>
        </div>
        <Button type='submit'>submit</Button>
      </Form>
    </Modals>
  )
}

export default AddProducts