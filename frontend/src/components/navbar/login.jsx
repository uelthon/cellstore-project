import { Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Modals from '../modals'
import loginServices from '../../services/login'
import userServices from '../../services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import { setNoti } from "../../reducers/notiReducer";
import { setOrdersUser } from '../../reducers/ordersReducer'

const Login = (props) => {
  const [isLoading,setIsLoading] = useState(false)
  const [show, setShow] = useState(false);
  const {register, formState: { errors }, handleSubmit, reset} = useForm()
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  if(user && user.id) return null

  const messages = {
    req: 'This field is required'
  }

  const onSubmit = async (userInfo) => {
    setIsLoading(true)
    try{
      const data = await loginServices.login(userInfo)
      if(data.token){
        userServices.setToken(data.token)
        window.localStorage.setItem('userCellStore',JSON.stringify(data))
        try{
          const user = await userServices.getOne(data.id)
          dispatch(setUser(user))
          dispatch(setOrdersUser(user.id))
          setIsLoading(false)
          setShow(false)
          dispatch(setNoti([`user ${user.username} be logged`,'success']))
          reset()
        }catch(e){
          console.log(e)
          setIsLoading(false)
        }
      }
    }catch(e){
      console.log(e.response.data.error)
      dispatch(setNoti([e.response.data.error,'danger']))
      setIsLoading(false)
    }
  }

  return (
    <Modals btnTitle='Login' head='Login' show={show} setShow={setShow}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
        {...register('username',{required: messages.req})} type='text' 
        name='username' 
        placeholder="Enter Username" 
        />
        {errors.username && errors.username.message}
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
      <Button variant="primary" type="submit" disabled={isLoading} >
        {isLoading ? <Spinner size="sm" animation="border" variant="secondary" /> :'Submit' }
      </Button>
    </Form>
    </Modals>
  );
}

export default Login