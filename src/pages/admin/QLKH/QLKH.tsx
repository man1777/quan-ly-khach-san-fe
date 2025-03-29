import { Button, Form, Input, Modal,  Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function QLKH() {
  const [DSUser, setDSUser] = useState([]);
  const loadUser = () => {
    axios.get('https://hotelmanagementapi20250217124648.azurewebsites.net/api/User?PageNumber=1&PageSize=50&Depth=0',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tk')}`
      }
    }).then(
      res => {
        console.log(res.data);
        setDSUser(res.data.items);
      }
    )
  }
  useEffect(() => {
    loadUser();
  }, [])
  
  const [showModalOpen, SetshowModalOpen] = useState(false);


  const [form] = Form.useForm()


  const handleOk = () => {
    SetshowModalOpen(false);
    const formData = new FormData();
    const data = form?.getFieldsValue()
    formData.append('Email',data.Email
    )
    formData.append('PhoneNumber',data.PhoneNumber
    )
    formData.append('Password',data.Password
    )
    formData.append('FirstName',data.FirstName
    )
    formData.append('LastName',data.LastName
    )
    formData.append('EmailVerified',''
    )
    formData.append('Avatar',''
    )
    formData.append(' RefreshToken',''
    )
    formData.append('IsDisabled','false'
    )
    formData.append('LastLogin',''
    )
    formData.append('HotelId','1'
    )
    axios.post('https://hotelmanagementapi20250217124648.azurewebsites.net/api/User',formData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tk')}`
      }
    }).then(
      res => {
        console.log(res.data, );
        setDSUser(res.data.items);

      }
    )
  };
  
  const handleCancel = () => {
    SetshowModalOpen(false);
  };
  const handleCancell = () => {
    setShowModalEdit(false);
  };
  const showModal = () => {
    SetshowModalOpen(true)
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'name',
    },
    {
      title: 'Họ',
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: 'Tên',
      dataIndex: 'lastName',
      key: 'address',
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, Item: any) => (
        <Space size="middle">
          <a onClick={() => editItem(Item)}>Chỉnh sửa</a>
          <a onClick={() => deleteItem(Item)}>Xóa</a>
        </Space>
      ),
    },
  ];
  const deleteItem = (Item: EditUser) => {
    console.log(Item);
    axios.delete(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/User/${Item.id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tk')}`
      }
    }).then(res => {
      loadUser();
    })
    
  }
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<EditUser>();
  const editItem = (Item: EditUser) => {
    setEditingUser(Item)
    form.setFieldsValue({
        id: Item.id,
        Email: Item.email, 
        FirstName: Item.FirstName, 
        LastName: Item.LastName,
        Password: Item.Password,
        PhoneNumber: Item.phoneNumber
      });
    setShowModalEdit(true)
    console.log(Item);
  }
  const userForm = new FormData ();
  const editUser = () => {
    const data = form?.getFieldsValue();
    userForm.append('id', data.id);
    userForm.append('Email', data.Email);
    userForm.append('PhoneNumber', data.PhoneNumber);
    userForm.append('Password', data.Password);
    userForm.append('FirstName', data.FirstName);
    userForm.append('LastName', data.LastName);
    userForm.append('EmailVerified', '');
    userForm.append('Avatar', '');
    userForm.append('RefreshToken', '');
    userForm.append('IsDisabled', 'false');
    userForm.append('LastLogin', '');
    userForm.append('HotelId', '1');
    console.log("Dữ liệu gửi:", data);
    if (editingUser) {
      axios.put(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/User/${editingUser.id}`,userForm,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tk')}`
        }
      })
        .then(res => {
          console.log("Cập nhật thành công", res.data);
          loadUser();
          setShowModalEdit(false);
        });
    } 
  };
  return <>
    <Button className="btn-modal" type="primary" onClick={showModal}>
      Thêm người dùng
    </Button>
    <Table dataSource={DSUser} columns={columns} />
    <Modal title="Thêm thông tin người dùng " open={showModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form name="formData" form={form} layout="vertical">

        <Form.Item<NewUser>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input Room Number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="Họ"
          name="FirstName"
          rules={[{ required: true, message: "Please input Floor!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<NewUser>
          label="Tên"
          name="LastName"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="Mật Khẩu"
          name="Password"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="SĐT"
          name="PhoneNumber"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>


    <Modal title="Chỉnh sửa thông tin người dùng" open={showModalEdit} onOk={editUser} onCancel={handleCancell}>
      <Form name="formData" form={form} layout="vertical">

        <Form.Item<NewUser>
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input Room Number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="Họ"
          name="FirstName"
          rules={[{ required: true, message: "Please input Floor!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<NewUser>
          label="Tên"
          name="LastName"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="Mật Khẩu"
          name="Password"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewUser>
          label="SĐT"
          name="phoneNumber"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>
}
interface NewUser {
  email: string;
  PhoneNumber: string;
  Password: string;
  FirstName: string;
  LastName: string;
  EmailVerified: boolean;
  Avatar: string;
  RefreshToken: string;
  IsDisabled: boolean;
  LastLogin: string;
  HotelId: number

}
interface EditUser {
    id: number;
    Email: string;
    phoneNumber: string;
    Password: string;
    FirstName: string;
    LastName: string;
    EmailVerified: boolean;
    Avatar: string;
    RefreshToken: string;
    IsDisabled: boolean;
    LastLogin: string;
    HotelId: number
  
  }
export default QLKH;