import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {AiOutlineLogout} from 'react-icons/ai'

function DefaultLayout(props) {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white">
          {" "}
          <b className="secondary-text">Computer Science Department </b>
          Results{" "}
        </h1>
        <div className="d-flex justify-content-space-between" style={{flexDirection:'column'}}>
          <h1 className="text-white text-small">{employee?.name}</h1>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            LogOut <AiOutlineLogout/>
          </h1>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
