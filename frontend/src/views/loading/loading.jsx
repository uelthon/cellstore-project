import React from "react"
import { Spinner } from "react-bootstrap"

const Loading = () => {

  return(
    <div style={{width:'100%', padding:'2rem',display:'grid',placeItems:'center'}}>
      <div>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
      </div>
    </div>
  )
}

export default Loading;