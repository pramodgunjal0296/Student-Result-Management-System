import React, { useEffect,useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../redux/alerts'
import { setEmployee } from '../redux/employees'
import DefaultLayout from '../components/DefaultLayout'

const ProtectedRoute = (props) => {

    const [readyToRednder,setReadyToRednder]=useState(false);   
    const dispatch = useDispatch();

    const getEmployeeData = async() => {
        try {
            dispatch(ShowLoading());
            const token = localStorage.getItem('token');
                 dispatch(HideLoading());
            const response = await axios.post(process.env.REACT_APP_BASE_URL+`/api/employee/get-employee-by-id`,
            {employeeId:3},
                {
                    headers: {
                        Authorization: `Bearer-${token}`,
                    },
                }
            );
            if (response.data.success) {
                dispatch(setEmployee(response.data.data))
                setReadyToRednder(true);
                console.log(response.data.data);
            }
        } catch (error) {
            console.log(error.message)
            dispatch(HideLoading());
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getEmployeeData();
    },[])

    return readyToRednder && <DefaultLayout>{props.children}</DefaultLayout>   
}

export default ProtectedRoute