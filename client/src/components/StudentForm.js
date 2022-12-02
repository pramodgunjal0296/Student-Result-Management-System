import { Col, Form, Input, Row } from 'antd'
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alerts';

function StudentForm() {
    const dispatch = useDispatch();
    const onFinish=async(values)=>{
        try {
         dispatch(ShowLoading())
          const response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/students/add-student",values)
          dispatch(HideLoading())
          if(response.data.success){
             toast.success(response.data.messsage)
             localStorage.setItem("token",response.data.data)
          }else{
            toast.error(response.data.message);
          }
        } catch (error) {
        dispatch(HideLoading())
        toast.error(error.message);
        }
 
     }
  return (
    <div>
        <input type="text"/>
        <Form layout='vertical' onFinish={onFinish}>
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
                    <input type="number"/>

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
