import React,{useState,useEffect} from 'react'
import PageTitle from '../../components/PageTitle'
import{useNavigate} from 'react-router-dom';
import { Table } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alerts';
import toast from 'react-hot-toast';
import { AiFillDelete} from 'react-icons/ai';
import {BsFillPencilFill} from 'react-icons/bs';

function Students() {

  const[students,setStudents]= useState([])
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const getStudents=async(values)=>{
    try {
     dispatch(ShowLoading());
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/api/students/get-all-students",
      {
        headers:{
            Authorization:`Bearer-${localStorage.getItem("token")}`
        }
      });
      console.log(response)
      dispatch(HideLoading())
      if(response.data.success){
        setStudents(response.data.data);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error.message);
    dispatch(HideLoading());
    toast.error(error.message);
    }

 };
 const deleteStudents=async(rollNo)=>{
  try {
   dispatch(ShowLoading());
  const response = await axios.delete(process.env.REACT_APP_BASE_URL+`/api/students/delete-student/${rollNo}`,
    {
      headers:{
          Authorization:`Bearer-${localStorage.getItem("token")}`
      }
    });
    dispatch(HideLoading())
    if(response.data.success){
     getStudents();
     toast.success(response.data.message)
    }else{
      toast.error(response.data.message);
    }
  } catch (error) {
      console.log(error.message);
  dispatch(HideLoading());
  toast.error(error.message);
  }

};
 useEffect(() => {
   getStudents();
 },[])
  const column=[
    {
      title:'Class',
      dataIndex:'class',
      key:'class',
    },
    {
      title:'Roll No',
      dataIndex:'rollNo',
      key:'rollNo',
    },
    {
      title:'First Name',
      dataIndex:'firstName',
      key:'firstName',
    },
    {
      title:'last Name',
      dataIndex:'lastName',
      key:'lastName',
    },
    {
      title:"Email",
      dataIndex:"email",
      key:"email",
    },
    {
      title:"Phone Number",
      dataIndex:"phoneNumber",
      key:"phoneNumber",
    },
    {
      title:"Action",
      key:'action',
      render:(text,record)=>(
        <div className='d-flex gap-3'>
          <span onClick={()=>{
            deleteStudents(record.rollNo)
          }}><AiFillDelete/>  </span>
          <span onClick={()=>{
            navigate(`/employee/students/edit/${record.rollNo}`)
          }}><BsFillPencilFill/></span>
        </div>
      )
    }, 
  ];
  console.log("Students:",students)
  return (
    <div>
      <PageTitle title="Students"/>
      <div className='d-flex justify-content-between align-items-center my-3'>
        <input type="text " className='w-300 px-2'placeholder='search students'/>
        <button className='primary text-white px-3'
         onClick={()=>{
            navigate('/employee/students/add');
        }}>Add Student </button>

      </div>
      <Table columns={column} dataSource={students}/>
    </div>
  )
}

export default Students
