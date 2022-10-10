import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
function ImgLoading({ children, height='auto' }) {
  const [ loading, setLoading ] = useState(true)

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <>
    <div style={{visibility: loading ? 'hidden' : 'visible', height:loading ? '0': 'auto'}}>
      <div onLoad={handleLoad}>                     
        {children}
      </div>
    </div>
    {loading ? 
      <div style={{height:`${height}`,width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Spinner animation="border" role="status" variant="primary"/>
      </div> 
      : null
    }
    </>
  )
}

export default ImgLoading