import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import userServices from "../../../services/users"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setNoti } from '../../../reducers/notiReducer'
import React from "react"

const DisableUser = ({id, status}) => {
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const num = query.get('offset') || 0

  const dispatch = useDispatch()

  const handleStatus = async () => {
    const prev = Number(num)
    try{
    await userServices.disableUser(id)
    navigate(`/admin/users?offset=${prev}&id=${id}&disable=${!status}`)
    if(!status){
      return dispatch(setNoti(['user was disabled','danger']))
    }
    return dispatch(setNoti(['user was actived','success']))
    }catch(e){
      console.log(e)
      dispatch(setNoti([e.response.data.error,'danger']))
    }
  }
  return(
    <div 
    style={{color: status ? 'red' : 'green',cursor:'pointer'}}
    onClick={() => handleStatus()}
    >
      <FontAwesomeIcon icon={faUser} />
    </div>
  )
}

export default DisableUser