import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs } from '@firebase/firestore';
import { Form, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase';
import { CancelButton, SubmitButton } from './styles';
import { useNavigate } from 'react-router-dom';
interface UserInfo {
  email: string,
  fullname: string,
  password: string,
  phone: string,
  role: string,
  status: string,
  username: string
}
const ModalForm = () => {
  const [form] = Form.useForm();
  const [options,setOptions] = useState();
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | any>();
  const navigate = useNavigate();

  const fetchDataServices = async () => {
    setLoading(true)
    const docRef = collection(db, "services"); //tra ve collection 
    const docSnap = await getDocs(docRef);
    
    let newServices:any = []
    docSnap.forEach((doc) => { //lấy từng doc trong firebase
        newServices.push(
          {
              value: doc.data().name,
              label: doc.data().name,
            }
        );
        // console.log(doc.id, " => ", doc.data().name);

    });
      setOptions(newServices)
      setLoading(false)
  }
  useEffect(()=>{
    fetchDataServices();
    // let today = new Date();
    // console.log(`Thời gian cấp:${today.getHours()}:${today.getMinutes()} ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`);

    
},[])

const HandleCancel = () => {
  navigate(`/NumberLevel/Table`)
}
const HandleCreate =async () => {
  let today = new Date();
  // console.log(today.getHours());
  const data = await form.validateFields();
  const docRef = collection(db, "numberlevel"); //tra ve collection 
  let count:any = []
  const snapshot = await getCountFromServer(docRef);
  const docSnap2 = await getDoc(doc(db, "users",`${localStorage.getItem('token')}`));
  setUserInfo(docSnap2.data())
  await addDoc(docRef, {
    numerical: snapshot.data().count+1,
    services_used: data.services_used,
    fullname: userInfo.fullname,
    status:"Đang chờ",
    issuedon:`${today.getHours()}:${today.getMinutes()} ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`,
    expiry:`17:30 ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`,
    })         
    .then(() => {
      // console.log("Document written:", docRef.id);
      // message.success("In số thành công!");
      // navigate(`/RoleManagement/Table`);
      alert(`Số thứ tự được cấp: ${snapshot.data().count+1}\n DV: ${data.services_used} \n Thời gian cấp: ${today.getHours()}:${today.getMinutes()} ${today.getDate()}/${today.getMonth()}/${today.getFullYear()} \nHạn sử dụng: 17:30 ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`);
    })
    .catch((error) => {
      message.error("In thất bại!");
  });
}
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Dịch vụ sử dụng"
        name="services_used"
        rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
        style={{ width: "85%" }}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          options={options}

          filterOption={(input:any, option:any) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
        {/* <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn dịch vụ"
            // onChange={handleChange}
            options={options}
            loading={loading}
           /> */}
      </Form.Item>
      <CancelButton onClick={HandleCancel}>Huỷ bỏ</CancelButton>
      <SubmitButton onClick={HandleCreate}>In số</SubmitButton>
    </Form>
  );
}

export default ModalForm
