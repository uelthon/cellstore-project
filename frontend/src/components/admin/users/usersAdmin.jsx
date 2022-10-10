import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Spinner } from "react-bootstrap"
import userServices from "../../../services/users"
import TableUsers from "./tableUsers"
import { useNavigate, useSearchParams } from "react-router-dom"

const UsersAdmin = () => {
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count , setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [searchParams] = useSearchParams();
  const num = searchParams.get('offset') || 0
  const isDisable = searchParams.get('disable') || false;
  const isAdmin = searchParams.get('admin') || false
  const userId = searchParams.get('id') || '';
  const navigate = useNavigate()

  useEffect(() =>{
    setOffset(Number(num))
  },[num])

  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      const data = await userServices.getAll(offset)
      setCount(data.count)
      setUsers(data.users)
      setLoading(false)
    }
    fetchUsers()
  },[offset, isDisable, userId, isAdmin])

  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:'2rem',gap:'2rem',alignItems:'center'}}>
      <h1>Users Management</h1>
      <div style={{width:'80%'}}>
      <TableUsers users={users} />
      </div>
      {loading ? <Spinner animation="border" role="status" variant="primary" /> : null}
      <div>
      <ButtonGroup>
        <Button onClick={() => navigate(`?offset=${offset - 5}`)} disabled={offset < 5}>prev</Button>
        <Button onClick={() => navigate(`?offset=${offset + 5}`)} disabled={offset > count - 5}>next</Button>
      </ButtonGroup>
      </div>
    </div>
  )
}

export default UsersAdmin