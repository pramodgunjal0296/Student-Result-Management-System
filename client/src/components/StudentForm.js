import { Col, Form , Row } from 'antd'
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alerts';

function StudentForm({student,type}) {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const onFinish=async(values)=>{
        try {
         dispatch(ShowLoading());
         let response=null;
         if(type==='edit')
         {
          response= await axios.post(process.env.REACT_APP_BASE_URL+`/api/students/update-student/${student.rollNo}`,
            values,{
              headers:{
                  Authorization:`Bearer-${localStorage.getItem("token")}`
              }
            });
         }else{
            response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/students/add-student",
            values,{
              headers:{
                  Authorization:`Bearer-${localStorage.getItem("token")}`
              }
            });
         }
        
          dispatch(HideLoading())
          if(response.data.success){
            
             toast.success(response.data.messsage);
             navigate("/employee/students")
          }else{
            toast.error(response.data.message);

          }
        } catch (error) {
            console.log(error.message);
        dispatch(HideLoading());
        toast.error(error.message);
        }
 
     }
  return (
    <div>
      
        <Form layout='vertical' onFinish={onFinish} initialValues={student}>
        <Row gutter={[10,10]}>
            <Col span={8}>
                <Form.Item label='First Name'name="firstName">
                    <input type="text"/>

                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Last Name'name="lastName">
                    <input type="text"/>

                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Roll No'name="rollNo">
                    <input type="number" disabled={type==="edit"?true:false}/>

                    </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Email'name="email">
                    <input type="text"/>

                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Phone Number'name="phoneNumber">
                    <input type="text"/>

                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Class'name="class">
                    <input type="number"/>

                </Form.Item>
            </Col>
        </Row>
        <div className='d-flex justify-content-end mt-2'>
            <button className='primary text-white px-5-3'>Save</button>
        </div>

        </Form>
    </div>
  )
}

export default StudentForm
