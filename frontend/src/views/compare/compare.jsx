import React from "react"
import { Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import CartButton from "../../components/cartButton"
import './compare.css'

const Compare = () => {
  const compare = useSelector((state) => state.compare.value)

  if(compare.length === 0) return null

  return(
    <div style={{width:'100%', padding:'2rem'}}>
      <h1>Compare</h1>
      <Table striped bordered hover responsive>
      <tbody>
        <tr>
          <th></th>
          {compare.map(e => <td key={e.id}><img className='compare-img' src={e.img} /></td>)}
        </tr>
        <tr>
          <th>Model</th>
          {compare.map(e => <td key={e.name}>{e.name}</td> )}
        </tr>
        <tr>
          <th>Brand</th>
          {compare.map(e => <td key={`${e.brand}-${e.id}`}>{e.brand}</td>)}
        </tr>
        <tr>
          <th>Processor</th>
          {compare.map(e => <td key={`${e.procesador.type}-${e.id}`}>{e.procesador.type} {e.procesador.speed}Ghz</td>)}
        </tr>
        <tr>
          <th>Display size</th>
          {compare.map(e => <td key={`${e.display.size}-${e.id}`}>{e.display.size}"</td>)}
        </tr>
        <tr>
          <th>Resolution</th>
          {compare.map(e => <td key={`${e.display.resolution}-${e.id}`}>{e.display.resolution} pixeles</td>)}
        </tr>
        <tr>
          <th>Ram</th>
          {compare.map(e => <td key={`${e.memory.ram}-${e.id}`}>{e.memory.ram}gb</td>)}
        </tr>
        <tr>
          <th>Rom</th>
          {compare.map(e => <td key={`${e.memory.rom}-${e.id}`}>{e.memory.rom}gb</td>)}
        </tr>
        <tr>
          <th>Back Camera</th>
          {compare.map(e => <td key={`${e.camera.back}-${e.id}`}>{e.camera.back}</td>)}
        </tr>
        <tr>
          <th>Front Camera</th>
          {compare.map(e => <td key={`${e.camera.front}-${e.id}`}>{e.camera.front}</td>)}
        </tr>
        <tr>
          <th>Battery</th>
          {compare.map(e => <td key={`${e.battery}-${e.id}`}>{e.battery}mAh</td>)}
        </tr>
        <tr>
          <th>Price</th>
          {compare.map(e => <td key={`${e.price}-${e.id}`}>${e.price}</td>)}
        </tr>
        <tr>
          <th>Add to Cart</th>
          {compare.map(e => <td key={`cart-${e.id}`}><CartButton id={e.id}/></td>)}
        </tr>
      </tbody>
      </Table>
    </div>
  )
}

export default Compare