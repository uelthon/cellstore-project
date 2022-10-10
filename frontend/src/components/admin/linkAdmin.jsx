import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const LinkAdmin = () => {
  const user = useSelector((state) => state.user.value)
  if(!user || !user.isAdmin) return null
  return(
  <Link to='/admin'>Admin</Link>
  )
}

export default LinkAdmin