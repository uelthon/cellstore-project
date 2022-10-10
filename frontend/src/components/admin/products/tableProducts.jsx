import React, { useState } from "react";
import { Button, Table, Form, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { orderProducts } from "../../../utils/operators";
import AddProducts from "./addProduct";
import ChangePrice from "./changePrice";
import DeleteProduct from "./deleteProduct";

const TableProducts = () => {
  const products = useSelector((state) => state.products.value)
  const [search, setSearch] = useState('')
  const [sortProducts, setsortProducts] = useState('recents')
  const [offset, setOffset] = useState(0)
  if(!products) return null
  const regexp = new RegExp(search,'i')
  const found = products.filter(e => regexp.test(e.name)) || []
  const orders = orderProducts[sortProducts]([...found]) || [] ;
  const display = orders.slice(offset, offset + 10)

  return(
    <div style={{display:'flex',flexDirection:'column', gap:'1rem', justifyContent:'flex-start'}}>
      <div style={{display:'grid', placeItems:'center', width:'100%'}}>
        <Form.Control
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Product'
          style={{width:'50%'}}
        />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Form.Select style={{width:'150px'}} value={sortProducts} onChange={(e) => setsortProducts(e.target.value)}>
        <option value='recents'>recents</option>
        <option value='older' >olders</option>
        <option value='lprice'>low prices</option>
        <option value='hprice' >high prices</option>
      </Form.Select>
      <AddProducts />
      </div>
      <Table size='sm' striped bordered hover responsive >
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit-Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {display.map(e => {
            const date = new Date(e.createdAt).toUTCString().substring(0,16)
            return(
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{date}</td>
              <td>{e.name}</td>
              <td>${e.price}</td>
              <td><ChangePrice id={e.id} name={e.name}/></td>
              <td><DeleteProduct id={e.id} /></td>
            </tr>
            )
          }
          )}
        </tbody>
      </Table>
      <div style={{display:'grid', placeItems:'center', width:'100%'}}>
        <ButtonGroup>
          <Button onClick={() => setOffset(offset - 10)} disabled={offset < 10}>Prev</Button>
          <Button onClick={() => setOffset(offset + 10)} disabled={offset >= orders.length - 10}>Next</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default TableProducts