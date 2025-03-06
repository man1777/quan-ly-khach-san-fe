import { Outlet } from "react-router-dom";
import "../styles/ClientStyles/HomePage.css";
import { Button } from "antd";
import logo from "../assets/client/HomePage/md_logo_L.avif";
const ClientLayout = () => {
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

  const renderNavArr = () => {
    return navArr.map((item) => {
      return (
        <>
          <a href={item.link} className="font-navbar text-sm cursor-pointer">
            {item.title}
          </a>
        </>
      );
    });
  };

  return (
    <>
      <div className="relative">
        {/* navbar begin */}
        <div
          className="navbar flex justify-between p-5 align-center"
          style={{ borderBottom: "1px solid #f4f4f4" }}
        >
          <div>
            <img src={logo} style={{ maxHeight: "60px" }}></img>
          </div>
          <div className="flex gap-5 items-center">{renderNavArr()}</div>
        </div>
        <div
          className="order-navbar grid grid-cols-12 divide-x-1 divide-dashed sticky top-0"
          style={{
            borderBottom: "1px solid #f4f4f4",
            backgroundColor: "white",
            boxShadow: "0 .25rem 1.25rem 0 rgba(0,0,0,.07)",
          }}
        >
          <div className="col-span-3  flex justify-center items-center">
            <div className="flex flex-col ">
              <div className="mb-3 font-navbar ">DATES (1 NIGHT)</div>
              <div>Thu, Mar 06 -- Fri, Mar 07</div>
            </div>
          </div>
          <div className="col-span-3  flex justify-center items-center">
            <div className="flex flex-col ">
              <div className="mb-3 font-navbar ">ROOM & GUESTS</div>
              <div>1 Room, 1 Adult</div>
            </div>
          </div>
          <div className="col-span-6 p-5 flex justify-center items-center">
            <div className="flex justify-between items-center">
              <div className="flex flex-col mr-60">
                <div className="mb-3 font-navbar ">Special Rates</div>
                <div>Lowest Regular Rate</div>
              </div>
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
                >
                  VIEW RATE
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* navbar end */}

        <div style={{ minHeight: "700px" }}>
          <Outlet />
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
