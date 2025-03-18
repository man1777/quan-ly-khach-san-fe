import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Result, Select, Skeleton } from "antd";
import "../../../styles/adminStylesPage/ManagementRoomsStyle.css";
// import { formatCurrency } from "../../../utils/utils"
import Search, { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalSaveRoom from "./ModalSaveRoom";
const ManagementRooms = () => {
  const [dataRoomsFilter, setDataRoomsFilter] = useState<RoomData[]>([]);

  const [searchInput, setSearchInput] = useState("");

  // const [optionsTinhTrang] = useState<string[]>(["Ready", "Booked"]);

  const [statusRoom, setStatusRoom] = useState<string>("All");

  const [floorRoom, setFloorRoom] = useState<number>(0);

  const [dataRoom, setDataRoom] = useState<RoomData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [dataRoomType, setDataRoomType] = useState<RoomType[]>([]);

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

  // const optionsGiaTien = [
  //   {
  //     label: "0 - 1.000.000 VNĐ",
  //     value: 1,
  //   },
  //   {
  //     label: "1.000.000 - 3.000.000 VNĐ",
  //     value: 2,
  //   },
  //   {
  //     label: "3.000.000 - 10.000.000 VNĐ",
  //     value: 3,
  //   },
  //   {
  //     label: "10.000.000 - 50.000.000 VNĐ",
  //     value: 4,
  //   },
  // ];

  // const renderStatus = (room: Room) => {
  //   if (room.status === 1) return <Tag color="green" style={{ marginInlineEnd: '0px' }}>Còn trống</Tag>;
  //   if (room.status === 2) return <Tag color="gold">Đã đặt phòng</Tag>;
  //   if (room.status === 3) return <Tag color="magenta">Đã đặt trước</Tag>;
  //   return <Tag color="red">Đang bảo trì</Tag>;
  // }

  const classCenter = () => {
    const className = "flex justify-between items-center";
    return className;
  };

  // const classStatusRoom = (status: string) => {
  //   let className = "";
  //   if (status == "Ready") {
  //     className = "bg-green-300";
  //   } else if (status == "Booked") {
  //     className = "bg-red-400";
  //   }
  //   return className;
  // };

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
                      <EditOutlined key="edit" />,
                      <SettingOutlined key="setting" />,
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
                      {/* <div className={classCenter()}>
                      <b>Giá phòng: </b> <span>{formatCurrency(room.price)}</span>
                    </div>
                    <div className={classCenter()}>
                      <b>Tình trạng: </b> {renderStatus(room)}
                    </div>
                    <div>{room.description}</div> */}
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
          {/* <Select
            size="large"
            placeholder="Giá phòng"
            onChange={handleChange}
            style={{ width: 250 }}
            options={optionsGiaTien}
          /> */}
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
export default ManagementRooms;
