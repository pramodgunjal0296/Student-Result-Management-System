import { Form,Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/alerts';
import toast from 'react-hot-toast';


const Register = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    const onFinish=async(values)=>{
       try {
        dispatch(ShowLoading())
         const response = await axios.post(process.env.REACT_APP_BASE_URL+"/api/employee/register",values)
         dispatch(HideLoading())
         if(response.data.success){
            toast.success(response.data.messsage)
            localStorage.setItem("token",response.data.data);
           navigate("/login");
         }else{
           toast.error(response.data.message);
         }
       } catch (error) {
        console.log(error.message)
       dispatch(HideLoading())
       toast.error(error.message)
       }

    }
  return (
    <div className='primary d-flex align-items-center justify-content-center h-screen'>
        <Form layout='vertical w-400 white p-4' onFinish={onFinish}>
            <h1 className='text-medium'>Employee-Registration</h1>
            <hr />
            <Form.Item name='name' label='Name'>  
                <Input/>
            </Form.Item>
            <Form.Item name='employeeId' label='Employee ID'>
                <Input/>
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input type='password'/>
            </Form.Item>
            <Form.Item name='confirmPassword' label='Confirm Password'>
                <Input type='password'/>
            </Form.Item>
            <button className='primary text-white px-5 my-2 w-100'>REGISTER</button>
            <Link to='/login' className='text-small text-black'>Already Registered, Click Here to Login</Link>

        </Form>
    </div>
  )
}

export default Register