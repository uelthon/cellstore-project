import React from "react"
import { Link } from "react-router-dom"
import './admin.css'

const Admin = () => {
  
  return(
    <div className="container-admin" style={{padding:'2rem'}}>
      <h1>Administration</h1>
      <div className="container-admin-nav">
      <Link to='/admin/products'><div className="admin-nav-link admin-nav-link-products">Products</div></Link>
      <Link to='/admin/users'><div className="admin-nav-link admin-nav-link-users">Users</div></Link>
      <Link to='/admin/orders'><div className="admin-nav-link admin-nav-link-orders">Orders</div></Link>
      <Link to='/admin/stats'><div className="admin-nav-link admin-nav-link-stats">Stats</div></Link>
      </div>
    </div>
  )
}

export default Admin