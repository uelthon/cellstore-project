import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import { setNoti } from "../../reducers/notiReducer";
import userServices from '../../services/users'
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ordersReset } from '../../reducers/ordersReducer';

const UserDrop = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  if(!user || !user.id) return null

  const logout = () =>{
    userServices.setToken(null)
    dispatch(setUser(null))
    dispatch(ordersReset())
    window.localStorage.removeItem('userCellStore');
    dispatch(setNoti(['logged out','danger']))
  }

  return (
    <Dropdown as={ButtonGroup}>
    <Button variant="light">{user.username}</Button>

    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

    <Dropdown.Menu>
      <div style={{display:'flex',flexDirection:'column', textAlign:'center',gap:'0.375rem'}}>
        <Link to='/pay'>Pay</Link>
        <div style={{borderBottom:'1px solid #e3e8ee'}}></div>
        <Link to='/orders' >Orders</Link>
        <div style={{borderBottom:'1px solid #e3e8ee'}}></div>
        <button style={{color:'red',backgroundColor:'transparent',border:'none'}} onClick={logout} >Logout</button>
      </div>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default UserDrop