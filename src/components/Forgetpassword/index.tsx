import { Form, Input, message } from 'antd'
import React from 'react'
import { CancelButton, SubmitButton } from './styles'
import { collection, getDocs } from '@firebase/firestore'
import form from 'antd/es/form'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase'

const Forgetpassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

    const HandleSubmit = async () => {
      const data = await form.validateFields();

      const querySnapshot = await getDocs(collection(db, "users"));
      let check = "Email chưa đăng kí!";
      querySnapshot.forEach(async (doc: any) => {
        if (
          doc.data().email === data.email
        ) {
          check = "";
        //   localStorage.setItem("token",doc.id);
        navigate(`/ResetPassword/${doc.id}`);

        }
      });
      if (check === "Email chưa đăng kí!") {
        message.error(check);
      }
      // console.log(data);
    }
    const HandleCancel = async () => {
        navigate(`/`);

    }

  return (
    <Form form={form} layout="vertical">

                <Form.Item
            label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
            name="email"
            rules={[{ required: true, message: "Email là bắt buộc!" }]}
          >
            <Input placeholder="Nhập Email của bạn" />
          </Form.Item>
          <CancelButton onClick={HandleCancel}>Huỷ bỏ</CancelButton>
        <SubmitButton onClick={HandleSubmit}>Tiếp tục</SubmitButton>
    </Form>
  )
}

export default Forgetpassword
