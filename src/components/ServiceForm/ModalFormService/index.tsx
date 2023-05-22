import { Checkbox, Form, Input, SelectProps, Space, message } from "antd";
import {
  ButtonShowPassword,
  CancelButton,
  Container,
  FormContainer,
  InputBox,
  InputField,
  Register,
  SubmitButton,
  Title,
} from "../../DeviceDashboard/ModalFormDevice/styles";
import { addDoc, collection, setDoc, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { Button,Select,Row,Col } from 'antd'
import { db } from "../../../firebase/firebase";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useNavigate, useParams } from "react-router-dom";
// const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'Tăng tự động từ: 0001 đến 9999', value: 'A' },
  { label: 'Prefix: 0001', value: 'B' },
  { label: 'Surfix:: 0001', value: 'C' },
  { label: 'Reset mỗi ngày', value: 'D' },
];
const ModalFormService = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  let { idservice } = useParams();
  const [service,setservice] = useState<any>();


  const fetchDataService = async () => {
    // setLoading(true)
    const docRef = doc(db, "services",`${idservice}`);
    const docSnap = await getDoc(docRef)

    setservice(docSnap.data());

    // setLoading(false)

  }
  useEffect(()=>{
    if(idservice){
      fetchDataService();
        // console.log(checkedList);

    }
},[])
useEffect(() => {
  if (service) {
    form.setFieldsValue(service);
  }
}, [service]);
  const HandleCreate = async () => {
    const data = await form.validateFields();

    if (idservice) {
      const data = await form.validateFields();
      // console.log(data);
      await updateDoc(doc(db, "services",`${idservice}`), {
        id: data.id,
        name: data.name,
        description: data.description,
          status: data.status,
          rule: data.rule
      })
        .then(() => {
          // console.log("Document written:", docRef.id);
          message.success("Cập nhật thành công!");
          navigate(`/ServiceManagement/Table`);
        })
        .catch((error) => {
          message.error("Cập nhật thất bại!");
      });
    }else{
    // console.log(data);
    await addDoc(collection(db,"services"), {
      id: data.id,
      name: data.name,
      description: data.description,
        status: data.status,
        rule: data.rule
      })  .then((docRef) => {console.log("Document written:", docRef.id)
      message.success('Thêm thành công!')
      navigate(`/ServiceManagement/Table`)

    })
      .catch((error) => {console.error("Error add doc: ", error);
      });
    }
  };
  const HandleCancel = () => {
    navigate(`/ServiceManagement/Table`)

}
  
;
  const onChange = (list: CheckboxValueType[] ) => {
        // setCheckedList(list);
  };
  return (
    //Họ và tên
    <Form form={form} layout="vertical">
      <Row gutter={[48, 16]}>
        <Col span={12}>
          <Form.Item
            label="Mã dịch vụ"
            name="id"
            rules={[{ required: true, message: "Mã dịch vụ là bắt buộc!" }]}
          >
            <Input placeholder="Nhập mã dịch vụ" />
          </Form.Item>
          <Form.Item
            label="Tên dịch vụ"
            name="name"
            rules={[{ required: true, message: "Tên dịch vụ là bắt buộc!" }]}
          >
            <Input placeholder="Nhập Tên dịch vụ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mô tả"
            name="description"
            // rules={[{ required: true, message: "Địa chỉ IP là bắt buộc!" }]}
          >
            <Input placeholder="Mô tả dịch vụ" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Tình trạng"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Select
              options={[
                { value: false, label: "Ngưng hoạt động" },
                { value: true, label: "Hoạt động" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[48, 32]}>
        <Form.Item
          label="Quy tắc cấp số"
          name="rule"
          rules={[{ required: true, message: "Vui lòng chọn!" }]}
        >
          <Checkbox.Group options={options} defaultValue={['']} onChange={onChange} />
        </Form.Item>
      </Row>

      <Row>
        <CancelButton onClick={HandleCancel}>Huỷ bỏ</CancelButton>
        <SubmitButton onClick={HandleCreate}>{idservice?"Cập nhật":"Thêm thiết bị"}</SubmitButton>

      </Row>
    </Form>
  );
};

export default ModalFormService;