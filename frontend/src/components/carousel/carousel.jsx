import React from "react"
import samsung from '../../statics/samsung.webp'
import xiaomi from '../../statics/xiaomi.webp';
import apple from '../../statics/apple.webp'
import {Carousel} from 'react-bootstrap';
import ImgLoading from "./imgLoading";
import './carousel.css'

function CarouselFade() {
  return (
    <Carousel  fade>
      <Carousel.Item>
        <ImgLoading height='50vh'>
          <img
            className='container-carousel-img'
            src={apple}
            alt="First slide"
          />
        </ImgLoading>
        <Carousel.Caption>
          <h3 style={{color:'#000'}}>First slide label</h3>
          <p style={{color:'#000'}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ImgLoading height='50vh'>
          <img
            className='container-carousel-img'
            src={xiaomi}
            alt="Second slide"
          />
        </ImgLoading>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ImgLoading height='50vh'>
          <img
            className='container-carousel-img'
            src={samsung}
            alt="Third slide"
          />
        </ImgLoading>
        <Carousel.Caption>
          <h3 style={{color:'#000'}}>Third slide label</h3>
          <p style={{color:'#000'}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;