import React from 'react'
import PageTitle from '../../components/PageTitle'
import{useNavigate} from 'react-router-dom';

function Students() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Students"/>
      <div className='d-flex justify-content-between align-items-center'>
        <input type="text " className='w-300 px-2'placeholder='search students'/>
        <button className='primary text-white px-3'
         onClick={()=>{
            navigate('/employee/students/add')
        }}>Add Student </button>

      </div>
    </div>
  )
}

export default Students
