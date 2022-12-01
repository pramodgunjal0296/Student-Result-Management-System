import React, { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../redux/alerts'

const ProtectedRoute = () => {
    const dispatch = useDispatch();

    const getEmployeeData = async() => {
        try {
            dispatch(ShowLoading());
            const token = localStorage.getItem('token');
                 dispatch(HideLoading());
            const response = await axios.post(
                process.env.REACT_APP_BASE_URL+`/api/employee/get-employee-by-id`,
             {employeeId:3},
                {
                    headers: {
                        Authorization: `Bearer-${token}`,
                    },
                }
            );
            if (response.data.success) {
                console.log(response.data.data);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getEmployeeData();
    }, [])

    return (
        <div>ProtectedRoute</div>
    )
}

export default ProtectedRoute