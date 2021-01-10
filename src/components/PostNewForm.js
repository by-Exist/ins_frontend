import { Button, Form, Input, Upload, Modal } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import getBase64FromFile from "../utils/base64"
import { parseErrorMessages } from "../utils/forms"
import { axiosInstance as axios } from "../api"
import { useAppContext } from '../store';
import { useHistory } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function PostNewForm() {

  const {
    store: { jwtToken }
  } = useAppContext()
  const [fileList, setFileList] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null
  })
  const history = useHistory()

  const handleFinish = async fieldValues => {
    const { caption, location, photo: { fileList } } = fieldValues;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    fileList.forEach(file => {
      formData.append("photo", file.originFileObj);
    })

    const headers = { Authorization: `JWT ${jwtToken}` };

    try {
      const response = await axios.post('/api/posts/', formData, { headers })
      history.push("/")
    }
    catch (err) {
      if (err.response) {
        const { status, data: fieldsErrorMessages } = err.response;
        console.log(err.response.data);
        if (typeof fieldsErrorMessages === "string") {
          console.error(`에러) ${status} 응답을 받았습니다.`);
        } else {
          // 인증 없이 실행되면 에러가 발생하는 문제가 있다.
          // 아마도 401 시에 해당 루트를 타서 string 체크를 검사하지 않기 때문인듯.
          setFieldErrors(parseErrorMessages(fieldsErrorMessages))
        }
      }
    }
  }

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList)
  }

  const handlePreviewPhoto = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj)
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    })
  }

  return (
    <Form
      {...layout}
      onFinish={handleFinish}
      autoComplete={'false'}
    // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Caption"
        name="caption"
        rules={[
          { required: true, message: 'Caption을 입력해주세요!' },
        ]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: 'Location을 입력해주세요!' },
        ]}
        hasFeedback
        {...fieldErrors.location}
        {...fieldErrors.non_field_errors}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요." }]}
        hasFeedback {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          onPreview={handlePreviewPhoto}
        >
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
          </Button>
      </Form.Item>

      <Modal
        visible={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img src={previewPhoto.base64} style={{ width: "100%" }} alt="Preview" />
      </Modal>
    </Form>
  )
}

export default PostNewForm