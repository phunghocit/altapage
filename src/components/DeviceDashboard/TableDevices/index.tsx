import { UserOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Table, Modal, Row, Col, Spin } from "antd";
import { TableCustom, ButtonAction, ButtonCreate } from "./styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase/firebase";

const TableDevices = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const location = useLocation();

  
  const AddDevice = () => {
    // localStorage.removeItem('token')
    navigate(`/DevicePage/AddDevice`);
  };

  const fetchData = async () => {
    setLoading(true);
    const docRef = collection(db, "devices"); //tra ve collection
    const docSnap = await getDocs(docRef);
    let newServices: any = [];
    docSnap.forEach((doc) => {
      //lấy từng doc trong firebase
      newServices.push({...doc.data(), iddevices: doc.id}); //lấy hết data vào trong mảng tạm newUsers
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    setLoading(false);
    });
    setDevices(newServices);
  };

  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    console.log(devices);
  }, [setDevices]);
  const onEdit = (iddevices: any) => {
    navigate(`/DevicePage/Update/${iddevices}`);
  };
  const onDetail = (iddevices: any) => {
    navigate(`/DevicePage/Detail/${iddevices}`);
  };

  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "namedevice",
      key: "namedevice",
    },
    {
      title: "Địa chỉ ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "active_status",
      key: "active_status",
      render: (text: any, item: any) => {
        return <p>{text === true ? "Hoạt động" : "Ngưng hoạt động"}</p>;
      },
    },
    {
      title: "Trạng thái kết nói",
      dataIndex: "connection_status",
      key: "connection_status",
      render: (text: any, item: any) => {
        return <p>{text === true ? "Kết nối" : "Mất kết nối"}</p>;
      },
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "services_used",
      key: "services_used",
      render: (text: any, item: any) => {
        return(
          <div>{item.services_used.map((service:any)=>{
              return(
                <div>{service}</div>
              )
          })}</div>
        )
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, item: any) => {
        return (
          <div>
            <ButtonAction
              onClick={() => {
                onDetail(item.iddevices);
              }}
            >
              Chi tiết
            </ButtonAction>
            <ButtonAction
              onClick={() => {
                onEdit(item.iddevices);
              }}
            >
              Cập nhật
            </ButtonAction>
          </div>
        );
      },
    },
  ];

  return (
    // <Spin tip="Loading">
    <Row wrap={false}>
      <Col flex="auto">
        <TableCustom
          columns={columns}
          dataSource={devices}
          // loading={loading}
          scroll={{ y: 430 }}
          onChange={(pagination: any) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("page", pagination.current);
            searchParams.set("limit", pagination.pageSize);

            navigate(`${location.pathname}?${searchParams.toString()}`);
            console.log(location);
          }}
        />
      </Col>
      <Col flex="none">
        <ButtonCreate onClick={AddDevice}>Thêm thiết bị</ButtonCreate>
      </Col>
    </Row>
    // </Spin>
  );
};

export default TableDevices;
