import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";

const ResultCheck = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentResult, setStudentResult] = useState(null)
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const getResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL +
        `/api/results/get-result/${params.resultId}`,
        values,
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );
     
      dispatch(HideLoading());
     
      if (response.data.success) {
        console.log("response in result after dispatch:", response.data.data)
        setResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const getStudentResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL +
        `/api/results/get-student-result`,
        {
          rollNo: rollNo,
          resultId: params.resultId,
        },
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response in  student result", response)
      dispatch(HideLoading());
      if (response.data.success) {
        setStudentResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (result) {
      getResult();
   
    }
  }, []);

  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white">
          {" "}
          <b className="secondary-text">Computer Science Department </b>
          Results{" "}
        </h1>
      </div>
      {result && (
        <div className="mt-3 p-3 card">
          <h1 className="text-small">Examination :{result.examination}</h1>
          <h1 className="text-small">Class : {result.class} </h1>
        </div>
      )}
      <hr />
      <div className="d-flex gap-3 p-3 card flex-row my-3">
        <input type='text' placeholder='Roll No' className="w-300"
          value={rollNo} onChange={(e) => setRollNo(e.target.value)}
        />
        <button className="primary px-5 text-white" onClick={() => {
          getStudentResult()
        }}>Get Result</button>
      </div>
      {studentResult && (
        <div className="card p-3">
          <div>
            <h1 className="text-medium">
             <b>Name:{studentResult.firstName} {studentResult.lastName}</b> 
            </h1>
          </div>
            <hr />
          <table className="table table-bordered w-50">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject,index) => (
                <tr key={index}>
                  <td>{subject.subjectName}</td>
                  <td>{subject.totalMarks}</td>
                  <td>
                    {studentResult.obtainedMarks[subject?.subjectName] || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{
            backgroundColor:"3A4F7A",
            width:'max-content'
          }} 
          className='p-3'
          >
            <h1 className="text-white">VERDICT : {studentResult?.verdict?.toUpperCase()}</h1>
          </div>
        </div>
      )
      }

    </div>
  );
};

export default ResultCheck;
