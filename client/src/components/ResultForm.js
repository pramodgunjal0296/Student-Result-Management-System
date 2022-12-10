import React from 'react'
import { Form, Row, Col, Space, Input} from 'antd'
import {AiFillDelete} from 'react-icons/ai'
function ResultForm() {


    const onFinish=(values)=>{
        try {
        console.log(values);
        } catch (error) {
          
        }
 
     }
    return (
        <div>

            <Form layout='vertical' onFinish={onFinish} initialValues={null}>
                <Row gutter={[10, 10]}>
                    <Col span={16}>
                        <Form.Item label='Examination' name="examination">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={8}/>
                    <Col span={8}>
                        <Form.Item label='Date' name="date">
                            <input type="date" />

                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Class' name="class">
                            <input type="number" />

                        </Form.Item>
                    </Col>
                </Row>
                <hr/>
                <Form.List name="name">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'subjectName']}
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input placeholder="Subject Name" />
                </Form.Item> 
                <Form.Item
                  {...restField}
                  name={[name, 'totalMarks']}
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input placeholder="Total Marks" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'passMarks']}
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input placeholder="Pass Marks" />
                </Form.Item>
               <span  onClick={() => remove(name)}><AiFillDelete/></span>
             
              </Space>
            ))}
            <Form.Item>
              <h1 type="dashed" onClick={() => add()} className="text-medium cursor-pointer underline mt-3">
                Add Subject
              </h1>
            </Form.Item>
          </>
        )}
      </Form.List>
     
                <div className='d-flex justify-content-end mt-2'>
                    <button className='primary text-white px-5'>Save</button>
                </div>

            </Form>
        </div>
    )
}

export default ResultForm
