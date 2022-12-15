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

  const[results,setResults]= useState([])
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const getResults=async(values)=>{
    try {
     dispatch(ShowLoading());
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/api/results/get-all-results",
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
 const deleteResults=async(resultId)=>{
  try {
   dispatch(ShowLoading());
  const response = await axios.delete(process.env.REACT_APP_BASE_URL+`/api/results/delete-result/${resultId}`,
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
      title:"Examination",
      dataIndex:"examination",
      key:"examination",
    },
    {
      title:'Class',
      dataIndex:'class',
      key:'class',
    },
    {
      title:"Date",
      dataIndex:"date",
      key:"date",
    },
    {
      title:"Action",
      key:'action',
      render:(text,record)=>(
        <div className='d-flex gap-3'>
          <span onClick={()=>{
            deleteResults(record.resultId)
          }}><AiFillDelete/>  </span>
          <span onClick={()=>{
            navigate(`/employee/results/edit/${record._id}`)
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
      <Table columns={column} dataSource={results}/>
    </div>
  )
}

export default Results

