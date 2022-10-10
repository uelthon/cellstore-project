import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { setNoti } from "../../reducers/notiReducer";
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification.value)
  const dispatch = useDispatch()

  if(!notification) return null

  const clear = () => {
    dispatch(setNoti(null))
  }

  return(
    <div className="notification" onClick={clear}>
      <Alert variant={notification[1]}>
          {notification[0]}
      </Alert>
    </div>
  )
}

export default Notification
