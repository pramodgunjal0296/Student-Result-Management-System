import React from 'react'
import PageTitle from '../../components/PageTitle'
import{useNavigate} from 'react-router-dom';
import StudentForm from '../../components/StudentForm';

function AddStudent() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Add Student"/>
      <StudentForm/>
     
    </div>
  )
}

export default AddStudent
