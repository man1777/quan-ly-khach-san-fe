import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Select, Tag } from "antd";
import "../../../styles/adminStylesPage/ManagementRoomsStyle.css"
import { formatCurrency } from "../../../utils/utils"
import Search, { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { Option } from "antd/es/mentions";
const ManagementRooms = () => {
  const dataRooms: Room[] = [];

  let [dataRoomsFilter] = useState<Room[]>();

  const [searchInput, setSearchInput] = useState('')

  const [optionsTinhTrang, setOptionsTinhTrang] = useState<string[]>(["Ready", "Booked"])

  let [statusRoom, setStatusRoom] = useState<string>('')

  let [dataRoom, setDataRoom] = useState<RoomData[]>([])

  useEffect(() => {
    const fetchData = async () => {

      const params = {
        PageNumber: 1,
        PageSize: 50,
        Depth: 0,
        Search: ''
      };
      axios.get(`https://hotelmanagementapi20250217124648.azurewebsites.net/api/Room?${params.PageNumber}&${params.PageSize}&${params.Depth}`).then(res => {
        if (res) {
          setDataRoom(res.data.items)
        }
      })
    };
    fetchData();
  }, []);

  const optionsLoaiPhong =
    [
      {
        label: "Phòng đơn",
        value: 1
      },
      {
        label: "Phòng đôi",
        value: 2
      },
      {
        label: "Phòng ba",
        value: 3
      },
      {
        label: "Phòng bốn",
        value: 4
      },
    ];

  const optionsGiaTien =
    [
      {
        label: "0 - 1.000.000 VNĐ",
        value: 1
      },
      {
        label: "1.000.000 - 3.000.000 VNĐ",
        value: 2
      },
      {
        label: "3.000.000 - 10.000.000 VNĐ",
        value: 3
      },
      {
        label: "10.000.000 - 50.000.000 VNĐ",
        value: 4
      },
    ];


  const fakeDataRoom = () => {
    for (let i = 0; i < 20; i++) {
      const data = {
        room_id: i,
        room_number: "P10" + i,
        room_type: "classic",
        price: Number(i + '000000'),
        status: 1,
        description: "phòng đẹp",
        bed_count: 2
      }
      dataRooms.push(data)
    }
  }

  const renderStatus = (room: Room) => {
    if (room.status === 1) return <Tag color="green" style={{ marginInlineEnd: '0px' }}>Còn trống</Tag>;
    if (room.status === 2) return <Tag color="gold">Đã đặt phòng</Tag>;
    if (room.status === 3) return <Tag color="magenta">Đã đặt trước</Tag>;
    return <Tag color="red">Đang bảo trì</Tag>;
  }

  const classCenter = () => {

    const className = "flex justify-between items-center"
    return className
  }

  const classStatusRoom = (status: string) => {
    let className = ""
    if (status == "Ready") {
      className = "bg-green-300"
    } else if (status == "Booked") {
      className = "bg-red-400"
    }
    return className
  }

  const handleChange = () => {

  }

  const onSearch: SearchProps['onSearch'] = (value) => {
    dataRoomsFilter = dataRooms.filter(item => item.room_number.includes(value))
    console.log('dataRoomsFilter', dataRoomsFilter);
  }

  fakeDataRoom()

  const onHandleChangeStatus = (e:React.ChangeEvent<HTMLInputElement>) => {
    setStatusRoom(e.target.value)
  }

  return (
    <>
      <div>
        <h1>ManagementRooms</h1>
      </div>
      {/* Thanh filter */}
      <div className="my-5 flex gap-4 justify-between">

        <div className="flex gap-4">
          <Select
            size="large"
            placeholder="Loại phòng"
            style={{ width: 200 }}
            options={optionsLoaiPhong}
          />
          <Select
            size="large"
            placeholder="Tình trạng phòng"
            onChange={onHandleChangeStatus}
            style={{ width: 200 }}
          >

            {optionsTinhTrang.map((option) => (
              <Option  value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            placeholder="Giá phòng"
            onChange={handleChange}
            style={{ width: 250 }}
            options={optionsGiaTien}
          />
        </div>
        <div className="w-100">
          <Search value={searchInput} placeholder="Tìm kiếm theo số phòng" onSearch={onSearch} onChange={(e) => setSearchInput(e.target.value)} enterButton size="large" />
        </div>
      </div>
      {/* Render các phòng */}
      <div className="grid grid-cols-5 gap-5 ">
        {
          dataRoom.map((room) => {
            return (
              <div key={room.id} className={classStatusRoom(room.status)}>
                <Card
                  className="w-full hover:shadow-2xl duration-300 hover:scale-102"
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }

                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <div className="flex flex-col">
                    <div className={classCenter()}>
                      <b>Số phòng: </b> <span>{room.roomNumber}</span>
                    </div>
                    <div className={classCenter()}>
                      <b>Số cửa sổ: </b> <span>{room.floor}</span>
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
          })}</div>
    </>
  );
};

interface Room {
  room_id: number;
  room_number: string;
  room_type: string;
  price: number;
  status: number;
  description: string;
  bed_count: number
}

interface RoomData {
  roomNumber: string,
  thumbnail: string,
  floor: number
  status: string,
  bookings: Array<string>,
  images: Array<string>,
  id: number
  createdAt: string,
  updatedAt: string,
}
export default ManagementRooms;
