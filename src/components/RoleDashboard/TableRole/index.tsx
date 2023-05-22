import React, { useEffect, useState } from 'react'
import { ButtonAction, ButtonCreate, TableCustom } from './styles'
import { Col, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
import { count, log } from 'console';

const TableRole = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const location = useLocation();
  
  const [roleUser,setRoleUser] = useState([]);


  // const fetchDataUser = async (item:string) => {

  //     const docRef = collection(db, "users"); //tra ve collection 
  //     const docSnap = await getDocs(docRef)
  //     let count=0;
      
  //     docSnap.forEach((doc) => { //lấy từng doc trong firebase

  //       if (doc.data().role===item) {
  //         count++;
  //         // console.log(doc.id, " => ", doc.data().role);
  //       }
  //     });
  //     console.log(count);  
  //      count=0;

  //     return count
  //   }
  const fetchData = async () => {
    // setLoading(true);
    const docRef = collection(db, "roles"); //tra ve collection
    const docSnap = await getDocs(docRef);
    let newRoles: any = [];
    docSnap.forEach( async (doc) => {
      //lấy từng doc trong firebase

      const docRef2 = collection(db, "users"); //tra ve collection 
      const docSnap2 = await getDocs(docRef2)
      let count=0;
      
      docSnap2.forEach((doc2) => { //lấy từng doc trong firebase

        if (doc2.data().role===doc.data().namerole) {
          count++;
        }
      });             
      newRoles.push({...doc.data(), idRole: doc.id,memberrole:count}); //lấy hết data vào trong mảng tạm newUsers
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(newRoles);
      setRoles(newRoles);
      
    });
  };

  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    console.log(roles);
  }, [setRoles]);

  const AddRole = () => {
    // localStorage.removeItem('token')
    navigate(`/RoleManagement/AddRole`)
    }
    const onEdit = (idRole: any) => {
      navigate(`/RoleManagement/Update/${idRole}`);
    };
  const columns =[
    {
        title: 'Tên vai trò',
        dataIndex: 'namerole',
        key: 'namerole'
    },
    {
        title: 'Số người',
        dataIndex: 'memberrole',
        key: 'memberrole'
    },

    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description'
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
                    <ButtonAction  onClick={()=>{onEdit(item.idRole)}}>Cập nhật</ButtonAction>
                </div>
            )
        }
    },
]

  return (
    <Row wrap={false}>
    <Col flex="auto">

    <TableCustom 
        columns={columns} 
        dataSource={roles} 
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
        <ButtonCreate onClick={AddRole}>Thêm vai trò</ButtonCreate>
    </Col>
</Row>
  );
}

export default TableRole
