import TableProducts from "./tableProducts"
import React from "react"
const AdminProducts = () => {
  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'flex-Start', alignItems:'center',paddingTop:'2rem'}}>
      <div style={{width:'80%'}}>
      <TableProducts />
      </div>
    </div>
  )
}

export default AdminProducts