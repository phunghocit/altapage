import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { Button, Descriptions, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useTimeout } from 'usehooks-ts'

interface DeviceInfo {
  id: string,
  namedevice: string,
  ip: string,
  active_status: string,
  type: string,
  connection_status: string,
  username: string,
  password: string,
  services_used: string,
}

const DetailDevice = () => {
  const [device,setDevice] = useState<any>();
  let { iddevices } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  // useTimeout(device, 5000)
  console.log(iddevices);
  
  const fetchDataServices = async () => {
    // setLoading(true)
    const docRef = doc(db, "devices",`${iddevices}`);
    const docSnap = await getDoc(docRef);
    setDevice(docSnap.data())
    // setLoading(false)

  };
  console.log(device);

  useEffect(()=>{
    fetchDataServices();
},[])

  const onEdit = (iddevices: any) => {
    navigate(`/DevicePage/Update/${iddevices}`);
  };
  return (
    <Form>
      {device && (
        <Descriptions 
        // loading={loading}
        title="Thông tin thiết bị"
        column={{ md: 2 }}
        extra={
          <Button
            type="primary"
            onClick={() => {
              onEdit(iddevices);
            }}
          >
            Cập nhật thiết bị
          </Button>
        }
      >
        <Descriptions.Item label="Mã thiết bị:">
        {device.id||""}
        </Descriptions.Item>
        <Descriptions.Item label="Loại thiết bị:">
          {device.type||""}
        </Descriptions.Item>
        <Descriptions.Item label="Tên thiết bị:">
          {device.namedevice||""}
        </Descriptions.Item>
        <Descriptions.Item label="Tên đăng nhập:">
          {device.username||""}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ IP:">
          {device.ip||""}
          </Descriptions.Item>
        <Descriptions.Item label="Mật khẩu:">
          {device.password||""}
        </Descriptions.Item>
        <Descriptions.Item label="Dịch vụ sử dụng:">
          {device.services_used||""}
        </Descriptions.Item>
      </Descriptions>
      )}
      
    </Form>
  );
}

export default DetailDevice
