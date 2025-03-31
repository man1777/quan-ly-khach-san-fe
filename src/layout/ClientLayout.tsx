import { Outlet, useNavigate } from "react-router-dom";
import "../styles/ClientStyles/HomePage.css";
import { Avatar, Button, DatePicker, Dropdown, InputNumber, MenuProps, Popover } from "antd";
import logo from "../assets/client/HomePage/md_logo_L.avif";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { UserOutlined } from "@ant-design/icons";

const ClientLayout = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [bookingTime, setBookingTime] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  const avatar = localStorage.getItem('avatar') ?? null
  const hoVaTen = localStorage.getItem('HoVaTen') ?? ''
  const navArr = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },
    {
      title: "Accommodations",
      link: "/",
    },
    {
      title: "Dining",
      link: "/",
    },
    {
      title: "Experiences",
      link: "/",
    },
    {
      title: "Meetings and Weddings",
      link: "/",
    },
  ];
  const [refresh, setRefresh] = useState(0);

  const [itemsDrop, setItemsDrop] = useState<MenuProps['items']>([])

  // const itemsDrop: MenuProps['items'] = [
  //   { key: '1', label: 'Tài khoản' },
  //   { key: '3', label: 'Quản lý' },
  //   { key: '2', label: 'Đăng xuất' },
    
  // ];

  const renderNavArr = () => {
    return navArr.map((item, index) => {
      return (
        <div key={index}>
          <a href={item.link} className="font-navbar text-sm cursor-pointer">
            {item.title}
          </a>
        </div>
      );
    });
  };

  const onHandleSignout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  const onHandleManagement = () => {
    navigate('/admin')
  }

  const onHandleSignin = () => {
    navigate('/auth')
  }

  useEffect(() => {
    if (sessionStorage.getItem("st") && sessionStorage.getItem("st")) {
      const st = dayjs(sessionStorage.getItem("st"));
      const et = dayjs(sessionStorage.getItem("et"));
      setBookingTime([st, et]);
      if(avatar){
        const drop =  [
          { key: '1', label: 'Tài khoản' },
          { key: '3', label: (<a  onClick={onHandleManagement} >
            Quản lý
            </a>) },
          { key: '2', label: (<a  onClick={onHandleSignout} >
          Đăng xuất
          </a>) },
          
        ];
        setItemsDrop(drop)
      }else{
        const drop =  [
          { key: '2', label: (<a  onClick={onHandleSignin} >
            Đăng nhập
            </a>) },
        ];
        setItemsDrop(drop)
      }
     
      
    }
  }, []);

  return (
    <>
      <div className="relative">
        {/* navbar begin */}
        <div
          className="navbar flex justify-between p-5 items-center"
          style={{ borderBottom: "1px solid #f4f4f4" }}
        >
          <div>
            <img src={logo} style={{ maxHeight: "60px" }}></img>
          </div>
          <div className="flex gap-5 items-center">{renderNavArr()}</div>
          <Dropdown menu={{ items: itemsDrop }} >
            <div className=" flex gap-2 items-center">
              {
                avatar != null && avatar.length > 0 ? (<Avatar size={"large"} src={<img src={`https://hotelmanagementapi20250217124648.azurewebsites.net/${avatar}`} alt="avatar" />} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>) : <Avatar icon={<UserOutlined />} />
              }
              <span className="font-bold">{hoVaTen != '' ? hoVaTen : 'Chưa đăng nhập'}</span>
            </div>
          </Dropdown>



        </div>
        <div
          className="order-navbar grid grid-cols-12 divide-x-1 divide-dashed sticky top-0"
          style={{
            borderBottom: "1px solid #f4f4f4",
            backgroundColor: "white",
            boxShadow: "0 .25rem 1.25rem 0 rgba(0,0,0,.07)",
          }}
        >
          <div className="col-span-4  flex justify-center items-center">
            <div className="flex flex-col ">
              <div className="mb-3 font-navbar ">DATES</div>
              <RangePicker
                value={bookingTime || undefined}
                format={"DD-MM-YYYY"}
                onChange={(date) => {
                  setBookingTime(date || [null, null]);
                }}
              />
            </div>
          </div>
          <div className="col-span-4  flex justify-center items-center">
            <div className="flex flex-col w-100 justify-center items-center">
              <div className="mb-3 font-navbar ">ROOM & GUESTS</div>
              <Popover
                placement="bottom"
                content={
                  <div className="flex flex-col gap-3 ">
                    <div className="flex justify-between gap-5 items-center">
                      <b>Adult</b>{" "}
                      <InputNumber
                        value={adult}
                        size="large"
                        min={1}
                        max={50}
                        defaultValue={1}
                        onChange={(value) => setAdult(value ?? 1)}
                      />
                    </div>
                    <div className="flex justify-between gap-5 items-center">
                      <b>Children</b>{" "}
                      <InputNumber
                        value={children}
                        size="large"
                        min={0}
                        max={50}
                        defaultValue={1}
                        onChange={(value) => setChildren(value ?? 0)}
                      />
                    </div>
                    <div className="flex justify-between gap-5 items-center">
                      <b>Room</b>{" "}
                      <InputNumber
                        value={room}
                        size="large"
                        min={1}
                        max={50}
                        defaultValue={1}
                        onChange={(value) => setRoom(value ?? 1)}
                      />
                    </div>
                  </div>
                }
              >
                <div>
                  <b className="text-xl">
                    {adult} Adult | {children} Children | {room} Room
                  </b>
                </div>
              </Popover>
            </div>
          </div>
          <div className="col-span-4 p-5 flex justify-center items-center">
            <div className="flex justify-between items-center">
              {/* <div className="flex flex-col mr-60">
                <div className="mb-3 font-navbar ">Special Rates</div>
                <div>Lowest Regular Rate</div>
              </div> */}
              <div>
                <Button
                  style={{
                    backgroundColor: "#263a50",
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  shape="round"
                  size="large"
                  className="hover:scale-110 duration-400 "
                  onClick={() => {
                    navigate(
                      `/booking?st=${bookingTime[0]?.format(
                        "DD-MM-YYYY"
                      )}&et=${bookingTime[1]?.format(
                        "DD-MM-YYYY"
                      )}&a=${adult}&c=${children}&r=${room}`
                    );
                    sessionStorage.setItem(
                      "st",
                      bookingTime[0] ? bookingTime[0].format("DD-MM-YYYY") : ""
                    );
                    sessionStorage.setItem(
                      "et",
                      bookingTime[1] ? bookingTime[1].format("DD-MM-YYYY") : ""
                    );
                    setRefresh((prev) => prev + 1);
                  }}
                >
                  VIEW RATE
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* navbar end */}

        <div className="h-fit py-10" >
          <Outlet key={refresh} />
        </div>

        <div className="footer flex justify-center py-10">
          <div style={{ width: "1200px" }}>
            <h1 className="text-4xl mb-5">LE MÉRIDIEN SAIGON</h1>
            <hr
              className="my-5"
              style={{ width: "70px", color: "white", borderTopWidth: "2px" }}
            />
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <div className="flex flex-col text-sm/10 underline  decoration-solid">
                  <a href="#">Overview</a>
                  <a href="#">Gallery</a>
                  <a href="#">Accommodations</a>
                  <a href="#">Dining</a>
                  <a href="#">Experiences</a>
                </div>
                <div className="flex flex-col text-sm/10 underline  decoration-solid">
                  <a href="#">Meetings and Wedding</a>
                </div>
              </div>

              <div className="flex flex-col text-sm/10 underline  decoration-solid">
                <span>3C Ton Duc Thang Street, District 1,</span>
                <span>Ho Chi Minh City, Vietnam</span>
                <span>Toll Free: +84-286-2636688</span>
              </div>
            </div>
            <hr
              className="mt-5"
              style={{ width: "70px", color: "white", borderTopWidth: "2px" }}
            />
            <div className="mt-5">
              <span>Follow Le Méridien Saigon Facebook Twitter Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientLayout;
