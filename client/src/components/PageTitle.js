import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function PageTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className="px-2 d-flex gap-5 align-items-center mb-2">
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="cursor-pointer"
      />
      <h1 className="text-large">{title}</h1>
      <hr />
    </div>
  );
}

export default PageTitle;
