import React from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'
import LogoAlta from '../../shared/images/LogoAlta.png'
import Banner from '../../shared/images/Group341.png'
import { db } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import  firebase  from '@firebase/app'
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore'
import { Form, Input, message } from 'antd'
import {LoginBanner, ButtonLogin, FormLogin, LabelCustom, LoginWrapper, ImgLogo, ImgBanner, LoginForm, Title, InputCustom } from './styles'
const defaultFormFields = {
  username: '',
  password: '',
}

const LoginFormUser = () => {
  const [form] = Form.useForm();

  const [formFields, setFormFields] = useState(defaultFormFields)
  const navigate = useNavigate()


  const handleSubmit = async () => {
    const data = await form.validateFields();
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc:any) => {
        if (doc.data().username===data.username && doc.data().password===data.password) {
          message.success('Đăng nhập thành công!')
          localStorage.setItem("token",doc.id);
      // console.log(accountlogin);
      // console.log(`${doc.id} => ${doc.data().username} ${doc.data().password}`);
          navigate('/Dashboard')
        }
    });
    const token = localStorage.getItem(`token`)
    if(!token){
      message.error('Sai mật khẩu hoặc tài khoản!');
    }
  }
  const forgetpassword=()=>{
    navigate('/Forgetpassword')
  }
  return (
    <LoginWrapper>
      <LoginForm>
        <ImgLogo src={LogoAlta} className="logo Alta" alt="Alta logo" />
        <FormLogin form={form} layout="vertical">
          <LabelCustom>Tên đăng nhập</LabelCustom>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Tên người dùng là bắt buộc" }]}
          >
            <InputCustom />
          </Form.Item>
          <LabelCustom>Mật khẩu</LabelCustom>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Mật khẩu là bắt buộc" }]}
          >
            <InputCustom type="password" />
          </Form.Item>
        </FormLogin>
        <ButtonLogin onClick={handleSubmit}>Đăng nhập</ButtonLogin>
        <a href="" onClick={forgetpassword}>
          Quên mật khẩu ?
        </a>
      </LoginForm>

      <LoginBanner>
          <ImgBanner src={Banner} className="logo Banner" alt="Banner logo" />
        {/* <Title>Hệ thống</Title>
        <Title>QUẢN LÝ XẾP HÀNG</Title> */}
      </LoginBanner>
    </LoginWrapper>


  );
  };
export default LoginFormUser;
