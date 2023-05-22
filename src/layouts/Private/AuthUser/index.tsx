import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Role, UserInfo, Username } from './styles';
import LoginFormUser from '../../../components/LoginFormUser';
import { useEffect, useState } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
const AuthUser = () => {
    const navigate = useNavigate();
    // const id:string = "qu1hRepnC3eQh9y06UOW";
  const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [username,setUseName]=useState<any>();
    const info = () => {
        // localStorage.removeItem('token')
        navigate(`/AccountInfo`)
    }


    const items = [
        {
          label: (
              <div>
                <a onClick={info}>
                    Thông tin cá nhân
                </a>
              </div>
          ),
          key: '0',
        }
      ];

      // const location = useLocation()
      // console.log(location);
      const fetchData = async () => {
        const docRef = doc(db, "users",`${localStorage.getItem('token')}`);
        const docSnap = await getDoc(docRef)
        setUseName(docSnap.data())
        // console.log(username.fullname);
        
        // const docRef = query(
        //   collection(db, "users"),
        //   where("username", "==", localStorage.getItem("token"))
        // ); //tra ve collection
        // const docSnap = await getDocs(docRef);
        // // console.log(docSnap)
        // docSnap.forEach((doc) => {
        //   //lấy từng doc trong firebase
        //   console.log(doc.id, " => ", doc.data());
        //   setUserInfo(doc.data());
        // });
      };
    
      useEffect(() => {
        fetchData();
      }, []);
const imagesListRef2 = ref(storage, `images/${localStorage.getItem('token')}`);
    
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
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <UserInfo>
            {imageUrls.map((url) => {
              return <img src={url} />;
            })}
            <div>
              <Role>Xin chào</Role>
              {username && <Username>{username.fullname}</Username>}
            </div>
          </UserInfo>
        </a>
      </Dropdown>
    );
}

export default AuthUser;