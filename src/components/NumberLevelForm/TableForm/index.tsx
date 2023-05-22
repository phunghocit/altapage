import React, { useEffect, useState } from 'react'
import { ButtonAction, ButtonCreate, TableCustom } from './styles'
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
import { Col, Row } from 'antd';

const TableForm = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    // setLoading(true);
    const docRef = collection(db, "numberlevel"); //tra ve collection
    const docSnap = await getDocs(docRef);
    let newnumber: any = [];
    docSnap.forEach( async (doc) => {
      // //lấy từng doc trong firebase

      // const docRef2 = collection(db, "users",`${localStorage.getItem('token')}`); //tra ve collection 
      // const docSnap2 = await getDocs(docRef2)
            
      newnumber.push({...doc.data(), idnumber: doc.id}); //lấy hết data vào trong mảng tạm newUsers
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(newnumber);
      setNumber(newnumber);
      
    });
  };

  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    console.log(number);
  }, [number]);

  const onDetail = (idnumber: any) => {
    // navigate(`/RoleManagement/Update/${idnumber}`);
  };
  const AddNumberLevel = (idnumber: any) => {
    navigate(`/NumberLevel/AddNumberLevel`);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "numerical",
      key: "numerical",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "services_used",
      key: "services_used",
    },

    {
      title: "Thời gian cấp",
      dataIndex: "issuedon",
      key: "issuedon",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expiry",
      key: "expiry",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Nguồn cấp",
      dataIndex: "source",
      key: "source",
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
                onDetail(item.idnumber);
              }}
            >
              Chi tiết
            </ButtonAction>
          </div>
        );
      },
    },
  ];

  return (
    <div>
    <Row wrap={false}>
    <Col flex="auto">

    <TableCustom 
        columns={columns} 
        dataSource={number} 
        // loading={loading} 
        scroll={{y: 430}}
        onChange={(pagination:any) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("page",pagination.current);
            searchParams.set("limit",pagination.pageSize);

            navigate(`${location.pathname}?${searchParams.toString()}`);
            console.log(location)
    }}/> 
    </Col>
    <Col flex="none">
        <ButtonCreate onClick={AddNumberLevel}>Cấp số mới</ButtonCreate>
    </Col>
</Row>
    </div>
  )
}

export default TableForm
