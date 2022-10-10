import React from "react"
import { Link } from 'react-router-dom'
import logo from '../../statics/celllogo.png'
import SearchForm from './searchForm'
import Login from './login'
import Create from './create'
import UserDrop from './userDrop';
import CartWidget from '../cartWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import LinkAdmin from '../admin/linkAdmin'
import './navbar.css'

const NavBar = () => {

  const expand = 'sm';

  return (
    <>
      <header className='container-header'>
        <div className='logo'>
          <Link to='/' ><img src={logo} /> <span>cell<strong>Store</strong></span></Link>
        </div>
        <nav className='container-header-nav'>
          <div className='bottom-nav'>
          <Link to='/allproducts'>
            <span className='title-allstore'>
            All Products
            </span> <FontAwesomeIcon icon={faStore} size='xl' />
         </Link>
          <SearchForm />
          </div>
          <CartWidget />
          <Login />
          <Create />
          <LinkAdmin />
          <UserDrop />
        </nav>
      </header>
    </>
  )
  }

export default NavBar