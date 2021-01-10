import { axiosInstance as axios } from "../../api"
import { Card, Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { setToken, useAppContext } from '../../store'
import { parseErrorMessages } from '../../utils/forms'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function Login() {

	const { dispatch } = useAppContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const history = useHistory()
	const location = useLocation()

	const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" } };

	const onFinish = (values) => {
		setFieldErrors({});

		async function fn() {
			try {
				const { data: { token: jwtToken } } = await axios.post("/accounts/token/", values);
				console.log("로그인 성공");
				// setjwtToken(jwtToken)
				dispatch(setToken(jwtToken));
				history.push(loginRedirectUrl);
			}
			catch (err) {
				console.log("로그인 실패");
				if (err.response) {
					const { data: fieldsErrorMessages } = err.response;
					console.log(fieldsErrorMessages);
					setFieldErrors(parseErrorMessages(fieldsErrorMessages))
				}
			}
		}

		fn();
	}

	return (
		<Card title="Login">
			<Form
				{...layout}
				onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{ required: true, message: 'Please input your username!' },
						{ min: 5, message: "5글자 이상 입력해주세요." }
					]}
					hasFeedback
					{...fieldErrors.non_field_errors}
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

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
            </Button>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default Login;