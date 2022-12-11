import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DefaultLayout(props) {
  const {employee} = useSelector(state=>state.employee);
  const navigate= useNavigate();
  console.log(employee)
  return (
    <div className='layout'>
        <div className="header d-flex justify-content-between align-items-center">
            <h1 className='text-white'>
              {" "}
            <b className='secondary-text'>Computer Science Department </b>   
            Results {" "}
            </h1>
            <div className='d-flex  align-items-center justify-content-center'>
            <h1 className='text-white text-medium'>{employee?.name}</h1>
            <h1 className='text-white text-small cursor-pointer'onClick={()=>{
              localStorage.removeItem("token")
              navigate("/login")
            }}>LogOut</h1>
            </div>
        </div>
        <div className="content">
            {props.children}

        </div>
      
    </div>
  )
}

export default DefaultLayout
