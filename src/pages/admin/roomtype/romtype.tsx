import { Button, Descriptions, Form, Input, Modal, Select, Space, Table } from "antd";
import Item from "antd/es/list/Item";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

function QLLP() {
  const [DQLLP, setDQLLP] = useState([]);
  const loadUser = () => {
    axios.get('https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType').then(
      res => {
        console.log(res.data);
        setDQLLP(res.data.items);
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
    formData.append('id',data.id
    )
    formData.append('name',data.name
    )
    formData.append('description',data.description
    )
    formData.append('pricePerNight',data.pricePerNight
    )
    formData.append('numberOfBathrooms',data.numberOfBathrooms
    )
    formData.append('numberOfBeds', data.numberOfBeds
    )
    formData.append('singleBed', data.singleBed
    )
    formData.append('doubleBed',data.doubleBed
    )
    formData.append('capacity', data.capacity
    )
    formData.append('sizes', data.sizes
    )
    formData.append('thumbnail', data.thumbnail
  )
    formData.append('Images', data.Images
    )
    axios.post('https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType',formData).then(
      res => {
        console.log(res.data);
        setDQLLP(res.data.items);

      }
    )
  };
  
  const handleCancel = () => {
    SetshowModalOpen(false);
  };
  const handleCancell = () => {
    setShowModalEdit(false);
    form.resetFields();
  };
  const showModal = () => {
    SetshowModalOpen(true)
  }

  const columns = [
    {
      title: 'Số Phòng',
      dataIndex: 'id',
      key: 'name',
    },
    {
      title: 'Tên Phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'address',
    },
    {
      title: 'Giá Mỗi Đêm',
      dataIndex: 'pricePerNight',
      key: 'address',
    },
    {
      title: 'Số Lượng Phòng Tắm',
      dataIndex: 'numberOfBathrooms',
      key: 'age',
    },
    {
      title: 'Số Lượng Giường',
      dataIndex: 'numberOfBeds',
      key: 'age',
    },
    {
      title: 'Giường Đơn',
      dataIndex: 'singleBed',
      key: 'age',
    },
    {
      title: 'Giường Đôi',
      dataIndex: 'doubleBed',
      key: 'age',
    },
    {
      title: 'Sức chứa',
      dataIndex: 'capacity',
      key: 'age',
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'sizes',
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
 const deleteItem = (Item: RoomType) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa loại phòng ${Item.name}?`)) {
        axios.delete(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType/${Item.id}`)
            .then(() => {
                loadUser();
            })
            .catch(error => {
                console.error("Lỗi khi xóa:", error);
            });
    }
};
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<editRoomType>();
  const editItem = (Item: editRoomType) => {
    setEditingUser(Item)
    form.setFieldsValue({
        id: Item.id,
        name: Item.name, 
        description: Item.description, 
        pricePerNight: Item.pricePerNight,
        numberOfBeds: Item.numberOfBeds,
        numberOfBathrooms: Item.numberOfBathrooms,
        singleBed: Item.singleBed,
        doubleBed: Item.doubleBed,
        capacity: Item.capacity,
        sizes: Item.sizes,
        thumbnail: Item.thumbnail,
        Images: Item.Images,
      });
    setShowModalEdit(true)
    console.log(Item);
  }
  const QLLPForm = new FormData ();
  const editUser = () => {
    const data = form?.getFieldsValue();
    QLLPForm.append('id',data.id
    )
    QLLPForm.append('name',data.name
    )
    QLLPForm.append('description',data.description
    )
    QLLPForm.append('pricePerNight',data.pricePerNight
    )
    QLLPForm.append('numberOfBathrooms',data.numberOfBathrooms
    )
    QLLPForm.append('numberOfBeds', data.numberOfBeds
    )
    QLLPForm.append('singleBed', data.singleBed
    )
    QLLPForm.append('doubleBed',data.doubleBed
    )
    QLLPForm.append('capacity', data.capacity
    )
    QLLPForm.append('sizes', data.sizes
    )
    QLLPForm.append('thumbnail', data.thumbnail
  )
    QLLPForm.append('Images', data.Images
    )
    if (editingUser) {
      axios.put(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType/${editingUser.id}`,QLLPForm)
        .then(res => {
          console.log("Cập nhật thành công", res.data);
          loadUser();
          setShowModalEdit(false);
          form.resetFields();
        });
    } 
  };
  return <>
    <Button className="btn-modal" type="primary" onClick={showModal}>
      Thêm Loại Phòng
    </Button>
    <Table dataSource={DQLLP} columns={columns} />
    <Modal title="Thêm Loại Phòng " open={showModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form name="formData" form={form} layout="vertical">

        <Form.Item<RoomType>
          label="Số Phòng"
          name="id"
          rules={[{ required: true, message: "Please input Room Number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Tên Phòng"
          name="name"
          rules={[{ required: true, message: "Please input Floor!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RoomType>
          label="Mô Tả"
          name="description"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giá Mỗi Đêm"
          name="pricePerNight"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Số Lượng Phòng Tắm"
          name="numberOfBathrooms"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Số Lượng Giường"
          name="numberOfBeds"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giường Đơn"
          name="singleBed"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giường Đôi"
          name="doubleBed"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Sức Chứa"
          name="capacity"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Kích cỡ"
          name="sizes"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Ảnh Bìa"
          name="thumbnail"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Ảnh Phòng"
          name="Images"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>


    <Modal title="Chỉnh sửa thông tin phòng" open={showModalEdit} onOk={editUser} onCancel={handleCancell}>
      <Form name="formData" form={form} layout="vertical">

        
      <Form.Item<RoomType>
          label="Số Phòng"
          name="id"
          rules={[{ required: true, message: "Please input Room Number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Tên Phòng"
          name="name"
          rules={[{ required: true, message: "Please input Floor!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RoomType>
          label="Mô Tả"
          name="description"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giá Mỗi Đêm"
          name="pricePerNight"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Số Lượng Phòng Tắm"
          name="numberOfBathrooms"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Số Lượng Giường"
          name="numberOfBeds"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giường Đơn"
          name="singleBed"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Giường Đôi"
          name="doubleBed"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Sức Chứa"
          name="capacity"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Kích cỡ"
          name="sizes"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Ảnh Bìa"
          name="thumbnail"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoomType>
          label="Ảnh Phòng"
          name="Images"
          rules={[{ required: true, message: "Please choose Status!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>
}
interface RoomType {
    name: string;
    description: string;
    pricePerNight: number;
    numberOfBathrooms: number;
    numberOfBeds: number;
    singleBed: number;
    doubleBed: number;
    capacity: number;
    sizes: number;
    thumbnail: string;
    Images: Array<string>;
    amenities: Array<string>;
    id: number;
    createdAt: string;
    updatedAt: string;
  } 
  interface editRoomType {
    name: string;
    description: string;
    pricePerNight: number;
    numberOfBathrooms: number;
    numberOfBeds: number;
    singleBed: number;
    doubleBed: number;
    capacity: number;
    sizes: number;
    thumbnail: string;
    Images: Array<string>;
    amenities: Array<string>;
    id: number;
    createdAt: string;
    updatedAt: string;
  } 
  
export default QLLP;