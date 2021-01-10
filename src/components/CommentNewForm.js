import React from 'react'
import { Button, Form, Input, Upload, Modal } from 'antd';
import { axiosInstance as axios } from "../api"
import { useAppContext } from '../store';
import { useHistory } from 'react-router-dom';

function CommentNewForm({ post_id, refetch }) {

  const { store: { jwtToken } } = useAppContext()
  const history = useHistory()

  const handleFinish = async fieldValues => {
    const { message } = fieldValues;
    const headers = { Authorization: `JWT ${jwtToken}` };

    const formData = new FormData();
    formData.append("message", message);

    try {
      await axios.post(`http://127.0.0.1:8000/api/posts/${post_id}/comments/`, formData, { headers })
      refetch()
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  }

  return (
    <Form
      onFinish={handleFinish}
      autoComplete={'false'}
    >
      <Form.Item
        name="message"
        rules={[
          { required: true, message: '내용을 입력해주세요!' },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CommentNewForm