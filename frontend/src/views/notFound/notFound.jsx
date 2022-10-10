import React from "react"
import nofound from '../../statics/nofound.svg'

const NotFound = () => {
  return(
    <div style={{width:'100%',textAlign:'center'}}>
      <img width='50%' src={nofound} />
    </div>
  )
}

export default NotFound