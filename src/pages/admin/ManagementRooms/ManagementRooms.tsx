import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Result,
  Select,
  Skeleton,
} from "antd";
import "../../../styles/adminStylesPage/ManagementRoomsStyle.css";
// import { formatCurrency } from "../../../utils/utils"
import Search, { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalSaveRoom from "./ModalSaveRoom";
import { ModalConfirm } from "../../../utils/utils";
const ManagementRooms = () => {
  const [dataRoomsFilter, setDataRoomsFilter] = useState<RoomData[]>([]);

  const [searchInput, setSearchInput] = useState("");

  const [statusRoom, setStatusRoom] = useState<string>("All");

  const [floorRoom, setFloorRoom] = useState<number>(0);

  const [dataRoom, setDataRoom] = useState<RoomData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [dataRoomType, setDataRoomType] = useState<RoomType[]>([]);

  const [isShowModalEdit, setIsShowModalEdit] = useState<boolean>(false);

  const [formData] = Form.useForm();

  const [idRoom, setIdRoom] = useState<number>(-1);

  useEffect(() => {
    getDataRooms();
    loadRoomType();
  }, []);

  const getDataRooms = async () => {
    setIsLoading(true);
    const params = {
      PageNumber: 1,
      PageSize: 50,
      Depth: 0,
      Search: "",
    };
    axios
      .get(
        `https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room?${params.PageNumber}&${params.PageSize}&${params.Depth}`
      )
      .then((res) => {
        if (res) {
          setDataRoom(res.data.items);
          setDataRoomsFilter(res.data.items);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const optionsLoaiPhong = [
    {
      label: "All floors",
      value: 0,
    },
    {
      label: "1 floor",
      value: 1,
    },
    {
      label: "2 floors",
      value: 2,
    },
    {
      label: "3 floors",
      value: 3,
    },
  ];

  const classCenter = () => {
    const className = "flex justify-between items-center";
    return className;
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setDataRoom(
      dataRoomsFilter.filter((item) => item.roomNumber.includes(value))
    );
  };

  const onHandleChangeStatus = (value: string) => {
    setStatusRoom(value);
  };

  const onHandleChangeFloor = (value: number) => {
    setFloorRoom(value);
  };

  const editItem = (item: RoomData) => {
    setIdRoom(item.id);
    formData.setFieldsValue({
      ...item,
      RoomNumber: item.roomNumber,
      Floor: item.floor,
      Status: item.status,
      RoomTypeId: null,
    });

    setIsShowModalEdit(true);
  };

  const handleOkEdit = () => {
    formData
      .validateFields()
      .then((res) => {
        if (res) {
          const data = formData.getFieldsValue();
          console.log("data", data);
          const formUpdate = new FormData();
          formUpdate.append("id", data.id);
          formUpdate.append("HotelId", "0");
          formUpdate.append("RoomTypeId", data.RoomTypeId);
          formUpdate.append("RoomNumber", data.RoomNumber);
          formUpdate.append("Floor", data.Floor);
          formUpdate.append("Status", data.Status);
          formUpdate.append("Thumbnail", "");
          formUpdate.append("Images", "");
          formUpdate.append("KeptImages", "");
          axios
            .put(
              `https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room/${idRoom}`,
              formUpdate
            )
            .then((res) => {
              if (res) {
                formData.resetFields();
                handleCancelEdit();
                getDataRooms();
                message.success("Cập nhật phòng thành công!");
              }
            })
            .finally(() => {});
        }
      })
      .catch(() => {});
  };

  const deleteItem = (item: RoomData) => {
    console.log("item1", item);
    ModalConfirm({
      onClose: () => {},
      onConfirm: () => onConfirmDelete(item),
      content: `Bạn có chắc chắn muốn xóa phòng ${item.roomNumber}?`,
    });
  };
  const onConfirmDelete = (item: RoomData) => {
    console.log("item", item);
    axios
      .delete(
        `https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room/${item.id}`
      )
      .then((res) => {
        if (res) {
          getDataRooms();
          message.success(`Xóa phòng thành công!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelEdit = () => {
    setIsShowModalEdit(false);
    setIdRoom(-1);
  };

  const renderRoom = () => {
    if (isLoading) {
      return <Skeleton active />;
    } else {
      const data = dataRoom
        .filter((room) => {
          if (statusRoom === "All") return true;
          else return room.status === statusRoom;
        })
        .filter((room) => {
          if (floorRoom === 0) return true;
          else return room.floor === floorRoom;
        });
      if (data.length === 0) {
        return (
          <div className="text-center">
            <Result title="Không có phòng nào" />
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-5 gap-5 ">
            {data.map((room) => {
              return (
                <div key={room.id}>
                  <Card
                    className={`w-full hover:shadow-2xl duration-300 hover:scale-102`}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    style={{
                      backgroundColor: `${
                        room.status == "Ready" ? "#32cd32" : "#c7090969"
                      }`,
                    }}
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          editItem(room);
                        }}
                      />,
                      <DeleteOutlined
                        key="setting"
                        onClick={() => {
                          deleteItem(room);
                        }}
                      />,
                    ]}
                  >
                    <div className={` "flex flex-col"`}>
                      <div className={classCenter()}>
                        <b>Số phòng: </b> <span>{room.roomNumber}</span>
                      </div>
                      <div className={classCenter()}>
                        <b>Tầng: </b> <span>{room.floor}</span>
                      </div>
                      <div className={classCenter()}>
                        <b>Trạng thái: </b> <span>{room.status}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };

  const loadRoomType = () => {
    const params = {
      PageNumber: 1,
      PageSize: 50,
      Depth: 0,
      Search: "",
    };
    axios
      .get(
        `https://hotelmanagementapi20250217124648.azurewebsites.net/api/RoomType?${params.PageNumber}&${params.PageSize}&${params.Depth}`
      )
      .then((res) => {
        if (res) {
          setDataRoomType(res.data.items);
        }
      });
  };

  return (
    <>
      <div>
        <h1>ManagementRooms</h1>
      </div>
      {/* Thanh filter */}
      <div className="my-5 flex gap-4 justify-between ring-2 ring-blue-500/50 p-5 rounded-md mb-10">
        <div className="flex gap-4">
          <Select
            value={floorRoom}
            size="large"
            placeholder="Chọn tầng"
            style={{ width: 200 }}
            options={optionsLoaiPhong}
            onChange={onHandleChangeFloor}
          />
          <Select
            size="large"
            value={statusRoom}
            placeholder="Tình trạng phòng"
            onChange={onHandleChangeStatus}
            style={{ width: 200 }}
            options={[
              { value: "All", label: <span>All rooms</span> },
              { value: "Ready", label: <span>Ready</span> },
              { value: "Booked", label: <span>Booked</span> },
            ]}
          ></Select>
        </div>
        <div className="w-100 flex gap-4">
          <Search
            value={searchInput}
            placeholder="Tìm kiếm theo số phòng"
            onSearch={onSearch}
            onChange={(e) => setSearchInput(e.target.value)}
            enterButton
            size="large"
          />
          <Button
            size="large"
            type="primary"
            onClick={() => setIsShowModal(true)}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Render các phòng */}
      {renderRoom()}
      <ModalSaveRoom
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        dataRoomType={dataRoomType}
        onSuccessful={() => getDataRooms()}
      ></ModalSaveRoom>
      <Modal
        title="Cập nhật phòng"
        open={isShowModalEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form layout="vertical" form={formData}>
          <Form.Item<ModalProps>
            label="Room type"
            name="RoomTypeId"
            rules={[{ required: true, message: "Please choose room type!" }]}
          >
            <Select
              options={dataRoomType.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
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

interface RoomData {
  roomNumber: string;
  thumbnail: string;
  floor: number;
  status: string;
  bookings: Array<string>;
  images: Array<string>;
  id: number;
  createdAt: string;
  updatedAt: string;
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

interface ModalProps {
  Id: number;
  HotelId: number;
  RoomTypeId: number;
  RoomNumber: string;
  Floor: number;
  Status: string;
  Thumbnail: string;
  Images: [];
  KeptImages: [];
}
export default ManagementRooms;
