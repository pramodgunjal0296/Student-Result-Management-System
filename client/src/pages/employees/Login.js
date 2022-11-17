import { Form,Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {

    const onFinish=(values)=>{
        console.log(values)

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
                <Input/>
            </Form.Item>
            
            <button className='primary text-white px-5 my-2 w-100'>Login</button>
            <Link to='/register' className='text-small text-black'>Not yet Registerd, Click Here to Login</Link>

        </Form>
    </div>
  )
}

export default Login
