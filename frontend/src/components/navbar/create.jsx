import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Modals from '../modals'
import userServices from '../../services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setNoti } from "../../reducers/notiReducer";

const Create = (props) => {
  const [show, setShow] = useState(false);
  const {register, formState: { errors }, handleSubmit, reset} = useForm()
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  if(user && user.id) return null

  const messages = {
    req: 'This field is required'
  }
  const onSubmit = async (userInfo) => {
    try{
      const data = await userServices.createUser(userInfo)
      console.log(data)
      setShow(false)
      dispatch(setNoti(['user created','success']))
      reset()
    }catch(e){
      console.log(e)
      dispatch(setNoti([e.response.data.error, 'danger']))
    }
  }

  return (
    <Modals btnTitle='Create' head='Create' show={show} setShow={setShow}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control 
        {...register('username',{required: messages.req})} type='text' 
        name='username' 
        placeholder="Enter Username" 
        />
        {errors.username && errors.username.message}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control 
        {...register('address',{required: messages.req})} type='text' 
        name='address' 
        placeholder="address" 
        />
        {errors.address && errors.address.message}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        {...register('password',{required: messages.req})} type='password' 
        name='password' 
        placeholder="Password" 
        />
        {errors.password && errors.password.message}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Modals>
  );
}

export default Create