import { Form,Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    const onFinish=async(values)=>{
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/employee/login",values)
            if(response.data.success){
               alert(response.data.message);
               localStorage.setItem("token",response.data.data)
            }else{
               alert(response.data.message);
            }
          } catch (error) {
           alert(error.message);
          }

    }
  return (
    <div className='primary d-flex align-items-center justify-content-center h-screen'>
        <Form layout='vertical w-400 white p-4' onFinish={onFinish}>
            <h1 className='text-medium'>Employee-Login</h1>
            <hr />
            <Form.Item name='employeeId' label='Employee ID'>
                <Input/>
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input type='password'/>
            </Form.Item>
            
            <button className='primary text-white px-5 my-2 w-100'>Login</button>
            <Link to='/register' className='text-small text-black'>Not yet Registerd, Click Here to Login</Link>

        </Form>
    </div>
  )
}

export default Login
