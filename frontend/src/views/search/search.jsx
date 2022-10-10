import React from "react"
import { useSelector } from "react-redux";
import Cards from "../../components/cards/cards";
import { useMatch } from "react-router-dom";
import NotFound from "../notFound";

const Search = () => {
  const products = useSelector((state) => state.products.value)
  const match = useMatch('/search/:name')
  const name = match.params.name;
  const regexp = new RegExp(name,'i')

  const matches = products?.filter(e => regexp.test(e.name) )

  if(!products || !matches) return <NotFound />

  return(
    <div style={{padding:'1rem'}}>
      <h1>Results of {name}</h1>
      <div className="container-gallery">
      {matches.map(e => <Cards key={e.id} item={e} /> )}
      {matches.length === 0 ? <NotFound />  : null }
      </div>
    </div>
  )
}

export default Search

