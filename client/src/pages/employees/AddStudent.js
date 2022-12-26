import React from "react";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";

function AddStudent() {
  return (
    <div>
      <PageTitle title="Add Student" />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2921/2921226.png"
        height={100}
        width={100}
        className="my-2"
      />
      <StudentForm />
    </div>
  );
}

export default AddStudent;
