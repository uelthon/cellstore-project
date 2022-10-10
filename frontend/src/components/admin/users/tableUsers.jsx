import { Table } from "react-bootstrap"
import DisableUser from "./disableUser"
import RoleUser from "./roleUser"
import React from "react"

const TableUsers = ({users}) => {

 return(
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Id</th>
        <th>Username</th>
        <th>Status</th>
        <th>Role</th>
        <th>Change Status</th>
        <th>Change Role</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? users.map(e =>
        <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.username}</td>
          <td style={{color: e.disable ? 'red' : 'green', fontWeight:'bold'}}>{e.disable ? 'Disable' : 'Active'}</td>
          <td>{e.isAdmin ? 'Admin' : 'Customer'}</td>
          <td><DisableUser id={e.id} status={e.disable} /></td>
          <td><RoleUser id={e.id} isAdmin={e.isAdmin} /></td>
        </tr>
        ) : null}
    </tbody>
  </Table>
 )
}
export default TableUsers