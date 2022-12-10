import React from 'react';
import {Row,Col} from 'antd';
// import '../../styles/theme.css'
import {useNavigate} from 'react-router-dom';


function EmployeeHome() {

  const navigate= useNavigate();
  return <div className='h-100 d-flex justify-content-center align-items-center'>
   <Row gutter={[10,10]}>
    <Col span={12}>
      <div className='p-5 secondary-border card w-300 cursor-pointer' onClick={()=>{
        navigate("/employee/students");
      }}>
        <h1>Student</h1>
      </div>
    </Col>
    <Col span={12}>
      <div className='p-5 secondary-border card w-300 cursor-pointer'onClick={()=>{
         navigate("/employee/results");
      }}>
        <h1>Results</h1>
      </div>
    </Col>

   </Row>
  </div> ;
  
}

export default EmployeeHome
