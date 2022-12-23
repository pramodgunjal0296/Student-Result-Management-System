import { Modal, Table } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { GrClose } from "react-icons/gr";
function EditResult() {
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        setResult(response.data.data);  
        const tempObtainedMarks = {};
        response.data.data.subjects.forEach((subject) => {
          tempObtainedMarks[subject.subjectName] = 0;
        });
        setObtainedMarks(tempObtainedMarks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL +
          `/api/students/get-all-students?class=${values}`,
        { class: result.class },
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const saveStudentResult = async () => {
    let verdict="pass";
    Object.keys(obtainedMarks).forEach((key)=>{

      const subjectName = key;
      const marks =obtainedMarks[key];
      const passMarks = result.subjects.find(subject =>subject.subjectName === subjectName).passMarks;
       if(Number(marks)< Number(passMarks)){
        verdict = 'fail';
       }
       return;
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/results/save-student-result",
        {
          resultId: params.resultId,
          examination: result.examination,
          studentId: selectedStudent._id,
          obtainedMarks: obtainedMarks,
          verdict,    
        },
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedStudent(null);
        setObtainedMarks(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
  ];
  useEffect(() => {
    if (result) {
      getResult();
    }
  }, []);
  return (
    <div>
      <PageTitle title="Result Info" />
      <div>
        <div className="mt-3">
          <h1 className="text-small">Name : {result.examination}</h1>
          <h1 className="text-small">Class : {result.class}</h1>
          <h1 className="text-small">Date : {result.date}</h1>
        </div>
        <hr />
        {!selectedStudent ? (
          <h1
            className="underline cursor-pointer text-medium"
            onClick={() => {
              getStudents(result.class);
              setShowStudentsModal(true);
            }}
          >
            Add Student
          </h1>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center card flex-row p-2">
              <h1 className="text-small">
                Student Name : {selectedStudent?.firstName}{" "}
                {selectedStudent?.lastName}
              </h1>
              <span
                onClick={() => {
                  const tempObtainedMarks = {};
                  result.data.subjects.forEach((subject) => {
                    tempObtainedMarks[subject.subjectName] = 0;
                  });
                  setObtainedMarks(tempObtainedMarks);
                  setSelectedStudent(null);
                  getStudents();
                }}
              >
                <GrClose /> 
              </span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td>{subject.totalMarks}</td>
                    <td>
                      <input
                        type="text"
                        className="w-110"
                        value={obtainedMarks[subject.subjectName]}
                        onChange={(e) => {
                          const tempObtainedMarks = { ...obtainedMarks };
                          tempObtainedMarks[subject.subjectName] =
                            e.target.value;
                          setObtainedMarks(tempObtainedMarks);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={saveStudentResult}>Save</button>
          </>
        )}
      </div>

      <Modal
        title="Select Student"
        open={showStudentsModal}
        onCancel={() => setShowStudentsModal(false)}
      >
        <Table
          columns={columns}
          dataSource={students}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedStudent(record);
                const resultExists = record.results.find(
                  (result) => result.resultId === params.resultId
                );
                if (resultExists) {
                  setObtainedMarks(resultExists.obtainedMarks);
                }
                setShowStudentsModal(false);
              },
            };
          }}
        />
      </Modal>
    </div>
  );
}

export default EditResult;
