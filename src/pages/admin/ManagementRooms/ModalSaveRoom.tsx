import { Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface ModalSaveRoomProps {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  dataRoomType: RoomType[];
  onSuccessful: () => void;
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

const ModalSaveRoom = ({
  isShowModal,
  setIsShowModal,
  dataRoomType,
  onSuccessful,
}: ModalSaveRoomProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {}, [isShowModal]);
  const handleOk = () => {
    setConfirmLoading(true);
    const formData = form.getFieldsValue();
    const dataInsert = new FormData();
    dataInsert.append("HotelId", "0");
    dataInsert.append("RoomTypeId", formData.RoomTypeId);
    dataInsert.append("RoomNumber", formData.RoomNumber);
    dataInsert.append("Floor", formData.Floor);
    dataInsert.append("Status", formData.Status);
    dataInsert.append("Thumbnail", "");
    dataInsert.append("Images", "");
    axios
      .post(
        "https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room",
        dataInsert
      )
      .then((res) => {
        if (res) {
          form.resetFields();
          setIsShowModal(false);
          onSuccessful();
          message.success("Lưu phòng thành công!");
        }
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsShowModal(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới phòng"
        open={isShowModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form name="formData" onFinish={handleOk} form={form} layout="vertical" >
          <Form.Item<ModalProps>
            label="Room type"
            name="RoomTypeId"
            rules={[{ required: true, message: "Please choose room type!" }]}
          >
            <Select
              labelRender={(option) => option.label}
              placeholder="Select room type"
              options={dataRoomType.map((item) => {
                return { label: item.name, value: item.id };
              })}
            ></Select>
          </Form.Item>
          <Form.Item<ModalProps>
            label="Room Number"
            name="RoomNumber"
            rules={[{ required: true, message: "Please input Room Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ModalProps>
            label="Floor"
            name="Floor"
            rules={[{ required: true, message: "Please input Floor!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ModalProps>
            label="Status"
            name="Status"
            rules={[{ required: true, message: "Please choose Status!" }]}
          >
            <Select
            defaultValue="Ready"
              options={[
                { label: "Ready", value: "Ready" },
                { label: "Booked", value: "Booked" },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

interface ModalProps {
  HotelId: number;
  RoomTypeId: number;
  RoomNumber: string;
  Floor: number;
  Status: string;
  Thumbnail: string;
  Images: [];
}
export default ModalSaveRoom;
