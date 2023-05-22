import { Button, Col, Form, Row } from 'antd';
import { CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonAction, ButtonCreate, Headbar, TableCustom } from './styles';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
import SearchBox from '../../SearchBox';

const TableService = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const location = useLocation();

    
    const AddService = () => {
        // localStorage.removeItem('token')
        navigate(`/ServiceManagement/AddService`)
        }

        


    const fetchData = async () => {
        const docRef = collection(db, "services"); //tra ve collection 
        const docSnap = await getDocs(docRef);
        
        let newServices:any = []
        docSnap.forEach((doc) => { //lấy từng doc trong firebase
            newServices.push({...doc.data(), idservice: doc.id}); //lấy hết data vào trong mảng tạm newUsers
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
          setServices(newServices);
    }
        
    useEffect(()=>{
        fetchData();
    },[])


    useEffect(()=>{
        console.log(services);
    },[setServices])
    const onEdit = (idservice:any) => {
        navigate(`/ServiceManagement/Update/${idservice}`);
    
    }
    const ondetail = () => {
        // localStorage.removeItem('token')
    }
        const columns =[
            {
                title: 'Mã dịch vụ',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Tên dịch vụ ',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Mô tả',
                dataIndex: 'description',
                key: 'description'
            },
            // {
            //     title: 'Trạng thái hoạt động',
            //     dataIndex: 'status',
            //     key: 'status'
            // },
            {
                title: 'Trạng thái hoạt động',
                dataIndex: 'status',
                key: 'status',
                render: (text:any,item:any) =>{
                    if (item.status==true) {
                        return(
                            <p><CheckCircleOutlined twoToneColor="#34CD26"/>Hoạt động</p>
                        )
                    }else{
                        return(
                            <p><CloseCircleOutlined twoToneColor="#EC3740"/>Ngưng hoạt động</p>
                            )
                    }
    
                }
            },
            // {
            //     title: '',
            //     dataIndex: 'action',
            //     key: 'action',
            //     render: (_:any,item:any) =>{
            //         return(
            //             <div>
            //                 <Button  onClick={()=>{onEdit(item.id)}}>Chi tiết</Button>
            //             </div>
            //         )
            //     }
            // },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                render: (_:any,item:any) =>{
                    return(
                        <div>
                            <ButtonAction  onClick={()=>{ondetail()}}>Chi tiết</ButtonAction>
                        </div>
                    )
                }
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                render: (_:any,item:any) =>{
                    return(
                        <div>
                            <ButtonAction  onClick={()=>{onEdit(item.idservice)}}>Cập nhật</ButtonAction>
                        </div>
                    )
                }
            },
        ]
        
  return (
    <div>
        <Row>
      <Headbar>
        <SearchBox />
      </Headbar>
      </Row>
      <Row wrap={false}>
        <Col flex="auto">
          <TableCustom
            columns={columns}
            dataSource={services}
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
          <ButtonCreate onClick={AddService}>Thêm dịch vụ</ButtonCreate>
        </Col>
      </Row>
    </div>
  );
}

export default TableService
