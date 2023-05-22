import React, { useEffect, useState } from 'react'
import { Checkbox, Col, Divider, Form, Input, Row, message } from 'antd'
import { CancelButton, SubmitButton } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const plainOptions = [
  { label: 'Chức năng A', value: 'A' },
  { label: 'Chức năng B', value: 'B' },
  { label: 'Chức năng C', value: 'C' },
 ];
const plainOptionsB = [
  { label: 'Chức năng X', value: 'X' },
  { label: 'Chức năng Y', value: 'Y' },
  { label: 'Chức năng Z', value: 'Z' },
];
const ModalRole = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    let { idrole } = useParams();
    const [role,setRoles] = useState<any>();


    const fetchDataRole = async () => {
        // setLoading(true)
        const docRef = doc(db, "roles",`${idrole}`);
        const docSnap = await getDoc(docRef)
        setRoles(docSnap.data());
        // setLoading(false)
      }
      useEffect(()=>{
        if(idrole){
            fetchDataRole();
        }
    },[])
    useEffect(() => {
      if(role){
        // console.log(role);
        form.setFieldsValue(role);
      }
    }, [role]);
    const HandleCreate = async () => {
        if (idrole) {
            const data = await form.validateFields();
            // console.log(data);
            await updateDoc(doc(db, "roles",`${idrole}`), {
                namerole: data.namerole,
                description: data.description,  
                function:data.function,
                functionb:data.functionb,
            })
              .then(() => {
                // console.log("Document written:", docRef.id);
                message.success("Cập nhật thành công!");
                navigate(`/RoleManagement/Table`);
              })
              .catch((error) => {
                message.error("Cập nhật thất bại!");
            });
          }else{
        const data = await form.validateFields();
        // console.log(data);
        await addDoc(collection(db,"roles"), {
          namerole: data.namerole,
          description: data.description,  
          function:data.function,
          functionb:data.functionb,
          })         
          .then(() => {
            // console.log("Document written:", docRef.id);
            message.success("Thêm vai trò thành công!");
            navigate(`/RoleManagement/Table`);

          })
          .catch((error) => {
            message.error("Thêm thất bại!");
        });
    }
    }
    const HandleCancel = () => {
      navigate(`/RoleManagement/Table`)
    }
    const onChange = (list: CheckboxValueType[] ) => {

      };
    const onChangeB = (list: CheckboxValueType[]) => {
    };


  return (
    <Form form={form} layout="vertical">
      <Row gutter={[48, 32]}>
        <Col span={12}>
          <Form.Item
            label="Tên vai trò"
            name="namerole"
            rules={[{ required: true, message: "Tên vai trò là bắt buộc!" }]}
          >
            <Input placeholder="Nhập Tên vai trò" />
          </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item label="Nhóm chức năng A" name="function">
              {/* <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Check all
              </Checkbox> */}
              {/* <Divider /> */}
              <Checkbox.Group options={plainOptions} defaultValue={['']} onChange={onChange} />
            </Form.Item>
            <Form.Item label="Nhóm chức năng B" name="functionb" >
            <Checkbox.Group options={plainOptionsB} defaultValue={['']} onChange={onChangeB} />

            </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[{ required: true, message: "Địa chỉ IP là bắt buộc!" }]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
        </Col>

        <Col span={12} />
      </Row>
      <Row gutter={[48, 32]}>
        <CancelButton onClick={HandleCancel}>Huỷ bỏ</CancelButton>
        <SubmitButton onClick={HandleCreate}>{idrole?"Cập nhật":"Thêm thiết bị"}</SubmitButton>

      </Row>
    </Form>
  );
}

export default ModalRole
