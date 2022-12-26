import React from "react";
import { Form, Row, Col, Space, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ShowLoading, HideLoading } from "../redux/alerts";
import { useNavigate } from "react-router-dom";

function ResultForm() {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.createdBy = employee._id;
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + `/api/results/add-result`,
        values,
        {
          headers: {
            Authorization: `Bearer-${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={null}>
        <Row gutter={[10, 10]}>
          <Col span={16}>
            <Form.Item label="Examination" name="examination">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Form.Item label="Date" name="date">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Class" name="class">
              <input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <Form.List name="subjects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "subjectName"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input placeholder="Subject Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "totalMarks"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input placeholder="Total Marks" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "passMarks"]}
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input placeholder="Pass Marks" />
                  </Form.Item>
                  <span onClick={() => remove(name)}>
                    <AiFillDelete />
                  </span>
                </Space>
              ))}
              <Form.Item>
                <h1
                  type="dashed"
                  onClick={() => add()}
                  className="text-medium cursor-pointer underline mt-3"
                >
                  Add Subject
                </h1>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className="d-flex justify-content-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default ResultForm;
