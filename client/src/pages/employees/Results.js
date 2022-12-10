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

function Results() {

  const[Students,setResults]= useState([])
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const getResults=async(values)=>{
    try {
     dispatch(ShowLoading());
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/api/Students/get-all-Student",
      {
        headers:{
            Authorization:`Bearer-${localStorage.getItem("token")}`
        }
      });
      dispatch(HideLoading())
      if(response.data.success){
        setResults(response.data.data);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error.message);
    dispatch(HideLoading());
    toast.error(error.message);
    }

 };
 const deleteResults=async(rollNo)=>{
  try {
   dispatch(ShowLoading());
  const response = await axios.delete(process.env.REACT_APP_BASE_URL+`/api/Students/delete-student/${rollNo}`,
    {
      headers:{
          Authorization:`Bearer-${localStorage.getItem("token")}`
      }
    });
    dispatch(HideLoading())
    if(response.data.success){
     getResults();
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
   getResults();
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
            deleteResults(record.rollNo)
          }}><AiFillDelete/>  </span>
          <span onClick={()=>{
            navigate(`/employee/results/edit/${record.rollNo}`)
          }}><BsFillPencilFill/></span>
        </div>
      )
    }, 
  ];
  return (
    <div>
      <PageTitle title="Results"/>
      <div className='d-flex justify-content-between align-items-center my-3'>
        <input type="text " className='w-300 px-2'placeholder='search Results'/>
        <button className='primary text-white px-3'
         onClick={()=>{
            navigate('/employee/results/add');
        }}>Add Result </button>

      </div>
      <Table columns={column} dataSource={Students}/>
    </div>
  )
}

export default Results

