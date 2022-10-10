import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchForm.css'

const SearchForm = () => {
  const products = useSelector((state) => state.products.value)
  const [search, setSearch] = useState('')
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const cleanSearch = search.replace(/[^\w ]|_/gi,'') 
  const regexp = new RegExp(cleanSearch,'i')

  const items =  search ? products.filter(e => regexp.test(e.name)).slice(0,10) : [];

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(false)
    navigate(`/search/${cleanSearch}`)
  }

 return ( 
  <div className='container-search'>
    <div className={`container-form ${toggle ? 'show-search' : '' }`} onClick={() => setToggle(false)}>
      <Form className="d-flex" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          list='items'
        />
        <datalist id='items'>
          {items.map(e =>
          <option key={e.id} value={e.name} />
          )}
        </datalist>
        <Button type='submit' variant="success">Search</Button>
      </Form>
    </div>
    <div className='search-toggle' onClick={() => setToggle(true)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' />
    </div>
  </div>
 )
}

export default SearchForm