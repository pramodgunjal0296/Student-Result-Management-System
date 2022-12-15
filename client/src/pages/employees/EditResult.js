import { Modal, Table } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function EditResult() {
  const [showStudentsModal, setShowStudentsModal] = useState([false, 0]);
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
        console.log(response.data.data);
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
  const getStudents = async (values) => {
    try {
      console.log(values, `values`);
      dispatch(ShowLoading());
      // //
      // const resultClass = axios.get(
      //   process.env.REACT_APP_BASE_URL +
      //     `/api/results/get-result/${params.class}`
      // );
      // const studentClass = axios.get(
      //   process.env.REACT_APP_BASE_URL +
      //     `/api/students/get-all-students/${params.class}`
      // );
      // const response = await axios.all(
      //   [resultClass==studentClass],

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
        console.log(response.data.data);
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
  useEffect(() => {
    getResult();
    if (showStudentsModal[0]) {
      console.log(result, "result");
      // getStudents((result.class = students.class));
      getStudents(showStudentsModal[1]);
    }
  }, []);

  // useEffect(() => {

  // }, [result]);
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
  return (
    <div>
      <PageTitle title="Result Info" />
      {result &&
        result.map((item, index) => (
          <div>
            <div className="mt-3">
              <h1 className="text-small">Name : {item.examination}</h1>
              <h1 className="text-small">Class : {item.class}</h1>
              <h1 className="text-small">Date : {item.date}</h1>
            </div>
            <hr />
            <h1
              className="underline cursor-pointer text-medium"
              onClick={() => setShowStudentsModal([true, item.class])}
            >
              Add Student
            </h1>
          </div>
        ))}
      <Modal
        title="Select Student"
        open={showStudentsModal[0]}
        onCancel={() => setShowStudentsModal([false, 0])}
      >
        <Table columns={columns} dataSource={students} />
      </Modal>
    </div>
  );
}

export default EditResult;
