import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Table } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import toast from "react-hot-toast";

function Home() {
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/results/get-all-results",
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
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
    if (results.length == 0) {
      getResults();
    }
  }, []);

  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between align-items-center py-3">
        <h1 className="text-white">
          {" "}
          <b className="secondary-text">Computer Science Department </b>
          Results{" "}
        </h1>
<<<<<<< HEAD
        <button
          className="text-gray rounded"
          onClick={() => navigate("/login")}
        >
          {" "}
          Teacher Login{" "}
        </button>
=======
        <div>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h1>
        </div>
>>>>>>> bc39e2589e51f4926fc0780ef6bb9691add794eb
      </div>

      {results.length > 0 ? (
        <Row gutter={(20, 20)}>
          <Col span={24}>
            <h1 className="text-large mt-3 ">
              Welcome Guys to Check your RESULTs
            </h1>
            <h1 className="text-large mt-3 ">
              Select Your Examination From Below..
            </h1>
            <hr />
          </Col>
          {results.map((result) => {
            return (
              <Col span={8}>
                <div
                  className="card p-2 cursor-pointer primary-border"
                  onClick={() => {
                    navigate(`/result/${result._id}`);
                  }}
                >
                  <h1 className="text-medium">{result.examination}</h1>
                  <hr />
                  <h1 className="text-small">Class : {result.class}</h1>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
          <h1 className="text-medium">No Reults Found</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
