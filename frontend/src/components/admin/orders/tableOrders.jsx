import RowOrder from "./rowOrder"
import { Table } from "react-bootstrap"
import React from "react"

const TableOrders = ({orders}) => {

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>id</th>
          <th>date</th>
          <th>user</th>
          <th>products</th>
          <th>total amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ?
        orders.map(e => <RowOrder key={e.id} order={e} />)
        : null}
      </tbody>
    </Table>
  )
}

export default TableOrders