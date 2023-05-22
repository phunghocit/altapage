import {  doc, getDoc } from "@firebase/firestore";
import { Col, Form, Input, Row, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { v4 } from "uuid";

const DEFAULT_USER = {
  fullname: "",
  phone: "",
  email: "",
  username: "",
  password: "",
  role: "",
};

interface UserInfo {
  email: string,
  fullname: string,
  password: string,
  phone: string,
  role: string,
  status: string,
  username: string
}

const UserInfo = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  // const [formData, setFormData] = useState(DEFAULT_USER);
  const [form] = Form.useForm();
  // const { userid } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | any>();
  console.log(localStorage.getItem('token'))
  const fetchData = async () => {
    // setLoading(true)
    const docRef = doc(db, "users",`${localStorage.getItem('token')}`);
    const docSnap = await getDoc(docRef);
    setUserInfo(docSnap.data())
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(userInfo){
      form.setFieldsValue(userInfo);
    }
  }, [userInfo]);
//avatar
const imagesListRef2 = ref(storage, `images/${localStorage.getItem('token')}`);

// const imagesListRef = ref(storage, `images/`);
const uploadFile = () => {
  // setLoading(true)
  listAll(imagesListRef2).then((response) => {
    response.items.forEach((item) => {
      deleteObject(item).then(() => { // Delete the file
        console.log('Đã xoá ảnh cũ');
      }).catch((error) => {
        console.log('Chưa xoá ảnh cũ');
      });
    });
  });

//Them zo 
const imageRef = ref(storage, `images/${localStorage.getItem('token')}/${imageUpload + v4()}`);

  if (imageUpload == null) return;
  // const imageRef = ref(storage, `images/${localStorage.getItem('token')}`);
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
    message.success("Thêm thành công")
    getDownloadURL(snapshot.ref).then((url) => {
      setImageUrls((prev) => [...prev, url]);
    });
  });
  setLoading(false)
};

useEffect(() => {
  listAll(imagesListRef2).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev:any) => [...prev, url]);
      });
    });
  });
}, []);
  return (
    <Form form={form} layout="vertical">
      {/* <Title>Quản lý tài khoản</Title>
    <Title>Thông tin tài khoản</Title> */}
<Row gutter={[48, 24]}>
      <Col span={8} >
      <input
        type="file"
        onChange={(e:any) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {/* <button onClick={deleteFile}> xoá</button> */}
      {imageUrls.map((url) => {
        return <img src={url} width='160px'/>;
      })}
        </Col>
        <Col span={8} >

          <Form.Item
            name="fullname"
            label="Họ tên"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (/((09|03|07|08|05||84)+([0-9]{8})\b)/g.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Vui lòng kiểm tra lại!"));
                },
              }),
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              { required: true, message: "Không được để trống" },
              { type: "email", message: "Định dạng không đúng!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8} >

          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UserInfo;
