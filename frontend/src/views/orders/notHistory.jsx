import React from "react"
import notHistory from '../../statics/notHistory.webp'

const NotHistory = () => {
  return(
    <div style={{display:'flex',flexDirection:'column', alignItems:'center' ,padding:'2rem'}}>
      <h1>No purchase history</h1>
      <img width='350px' height='350px' src={notHistory} />
    </div>
  )
}

export default NotHistory