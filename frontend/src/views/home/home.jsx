import React from "react"
import CarouselFade from "../../components/carousel/";
import NewProducts from "../../components/newProducts";
import BestSellers from "../../components/bestSellers";

const Home = () => {
  return(
    <div>
    <CarouselFade />
    <NewProducts />
    <BestSellers />
    </div>
  )
}

export default Home