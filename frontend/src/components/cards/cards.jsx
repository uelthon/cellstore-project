import React from "react"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import CartButton from '../cartButton';
import CompareButton from '../compareButton';
import ImgLoading from "../carousel/imgLoading";
import './cards.css'

function Cards({item}) {
  return (
    <Card className='container-card'>
      <ImgLoading height="90px" >
        <Card.Img variant="top" className='container-card-img' loading="lazy" src={item.img} />
      </ImgLoading>
      <Card.Body>
        <Card.Title  as='h6' >
          <Link to={`/product/${item.id}`} >{item.name}</Link>
        </Card.Title>
        <Card.Text>
          {/* <div>Processor: {item.procesador.type} {item.procesador.speed}Ghz</div>
          <div>Ram: {item.memory.ram}Gb</div>
          <div>Storage: {item.memory.rom}Gb</div> */}
          Price: ${item.price}  
        </Card.Text>
        <div className='container-card-button'>
        <CartButton id={item.id}/>
        <CompareButton item={item} label='Compare' />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cards;