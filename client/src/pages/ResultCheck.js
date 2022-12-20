import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";

const ResultCheck = () => {
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

  useEffect(() => {
    if (!result) {
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
          <div className="mt-3 p-3">
          <h1 className="text-small">Examination :{result.examination}</h1>
          <h1 className="text-small">Class : {result.class} </h1>
          </div>
        )}
        <hr />
        <div className="d-flex gap-3 p-3">
           <input type='text' placeholder='Roll No' className="w-300"/>
           <button className="primary px-5 text-white">Get Result</button>
        </div>
    </div>
  );
};

export default ResultCheck;
