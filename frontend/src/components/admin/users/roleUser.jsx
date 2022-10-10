import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faUserSecret } from "@fortawesome/free-solid-svg-icons"
import userServices from "../../../services/users"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setNoti } from '../../../reducers/notiReducer'
import React from "react"

const RoleUser = ({id,isAdmin}) => {
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const num = query.get('offset') || 0
  const dispatch = useDispatch()

  const handleRole = async () => {
    const prev = Number(num)
    try{
      await userServices.adminUser(id)
      navigate(`/admin/users?offset=${prev}&id=${id}&admin=${!isAdmin}`)
      if(isAdmin){
        return dispatch(setNoti(['User role change to customer','danger']))
      }
      return dispatch(setNoti(['User role change to Admin','success']))
    }catch(e){
      console.log(e)
      dispatch(setNoti([e.response.data.error,'danger']))
    }
  }

  return(
    <div style={{color:'#0d6efd', cursor:'pointer'}} onClick={() => handleRole()}>
      {isAdmin ?
        <FontAwesomeIcon icon={faUserSecret} />
      : <FontAwesomeIcon icon={faUsers} /> 
      }
    </div>
  )
}

export default RoleUser