import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Table, Modal, Row, Col } from "antd";
import { TableCustom,ButtonCreate, ButtonAction } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import {  collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
import active from '../../../shared/images/Ellipse1true.png'
import inactive from '../../../shared/images/Ellipse1false.png'

const {confirm} = Modal;


const TableUsers =  () => {
    const [users, setUsers] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchData = async () => {
        const docRef = collection(db, "users"); //tra ve collection 
        const docSnap = await getDocs(docRef);
        
        let newUsers:any = []
        docSnap.forEach((doc) => { //lấy từng doc trong firebase
            
            newUsers.push({...doc.data(), iduser: doc.id}); //lấy hết data vào trong mảng tạm newUsers
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
          setUsers(newUsers);
          console.log(newUsers);
          
    }
        
    useEffect(()=>{
        fetchData();
    },[])


    useEffect(()=>{
        console.log(users);
    },[users])

    const onDelete = (id:any) => {
    
    }
    
    const onEdit = (iduser: any) => {
        navigate(`/UpdateUser/${iduser}`);
      };
    const loading = (id:any) => {
    
    }
    const showConfirm = (id:any) => {
        confirm({
          title: 'Bạn có muốn xóa cuốn sách này ?',
          icon: <ExclamationCircleFilled />,
          content: 'Dữ liệu sẽ mất vĩnh viễn',
          onOk() {
            onDelete(id)
          },
          onCancel() {
          },
        });
    };

    const AddUser = () => {
    // localStorage.removeItem('token')
    navigate(`/AddUser`)
    }
    const columns =[
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Số điện thoai',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role'
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text:any,item:any) =>{
                if (item.status==true) {
                    return(
                        <p><img src={active}/>Hoạt động</p>
                    )
                }else{
                    return(
                        <p><img src={inactive}/>Ngưng hoạt động</p>
                        )
                }
                // return <p>{text === true ? "Kết nối" : "Mất kết nối"}</p>;

            }
        },
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     render: (_,item) =>{
        //         return(
        //             <Avatar src={item.avatar}/>
        //         )
        //     }
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_:any,item:any) =>{
                return(
                    <div>
                        <ButtonAction  onClick={()=>{onEdit(item.iduser)}}>Cập nhật</ButtonAction>
                    </div>
                )
            }
        },
    ]

    return(
        <Row wrap={false}>
            <Col flex="auto">

            <TableCustom 
                columns={columns} 
                dataSource={users} 
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
                <ButtonCreate onClick={AddUser}>Thêm tài khoản</ButtonCreate>
            </Col>
        </Row>

                  
    )
}

export default TableUsers;