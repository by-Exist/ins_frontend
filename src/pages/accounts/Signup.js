import { axiosInstance as axios } from "../../api"
import { Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



function Signup() {

  // // const [username, setUsername] = useState("");
  // // const [password, setPassword] = useState("");

  // // const handleSubmit = (e) => {
  // //   // Form은 preventDefault();를 호출해서 기본 동작을 제거할 수 있구나.
  // //   e.preventDefault();
  // //   console.log("username:", username)
  // //   console.log("password:", password)
  // // }

  // const [inputs, setInputs] = useState({});
  // const [errors, setErrors] = useState({});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   // 나는 이렇게 작성했다. 하지만 아래 방식이 더 적절하다고 생각한다.
  //   // setInputs({...inputs, [name]: value})
  //   setInputs(prev => ({ ...prev, [name]: value }))  // prev
  //   console.log(inputs)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({})
  //   axios.post("/accounts/signup/", inputs)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       // err.response에 응답이 담겨있다.
  //       console.log("error :", err);
  //       if (err.response.data) {
  //         // 이것보다 더 좋은 방식이 있을 것 같은데. 흠.
  //         setErrors({
  //           username: (err.response.data.username || []).join(" "),
  //           password: (err.response.data.password || []).join(" "),
  //         })
  //       }
  //     })
  // }

  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {

    setFieldErrors({});

    async function fn() {
      try {
        await axios.post("/accounts/signup/", values);

        history.push('/accounts/login');
      }
      catch (err) {
        console.log(err);
        if (err.response) {
          const { data: fieldsErrorMessages } = err.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errorList]) => {
              acc[fieldName] = {
                validateStatus: 'error',
                help: errorList.join(" "),
              };
              return acc;
            }, {})
          )
        }
      }
    }

    fn();
  }
  const onFinishFailed = (values) => { }

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 5, message: "5글자 이상 입력해주세요." }
        ]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        {...fieldErrors.password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[
          { required: true, message: 'Please input your nickname!' },
          { max: 20, message: "20글자 이하 입력해주세요." },
          { min: 3, message: "3글자 이상 입력해주세요." }
        ]}
        hasFeedback
        {...fieldErrors.nickname}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Signup
