import React from 'react'

import { useNavigate } from 'react-router-dom'

const PublicRoute = (props) => {
    const navigate=useNavigate();
    if(localStorage.getItem("token")){
        navigate("/employee")
   }

    return <>{props.children}</>
}

export default PublicRoute