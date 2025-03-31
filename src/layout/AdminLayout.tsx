import { Outlet, useNavigate } from "react-router-dom";
import "../styles/AdminLayout.css";
import { message, Space } from "antd";
import { useEffect, useState } from "react";
const AdminLayout = () => {
  interface menuItems {
    title: string;
    key: number;
    clicked: boolean;
  }
  const navigate = useNavigate();
  const [isAdmin,setIsAdmin] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<menuItems[]>([
    {
      title: "Quản lý phòng",
      key: 1,
      clicked: false,
    },
    {
      title: "Quản lý nhân viên",
      key: 2,
      clicked: false,
    },
    {
      title: "Quản lý khách hàng",
      key: 3,
      clicked: false,
    },
    {
      title: "Quản lý đặt phòng",
      key: 4,
      clicked: false,
    },
    {
      title: "Quản lý dịch vụ",
      key: 5,
      clicked: false,
    },
    {
      title: "Quản lý loại phòng",
      key: 6,
      clicked: false,
    },
  ]);

  const onClickMenu = (item: menuItems) => {
   
    switch (item.key) {
      case 1:
        setMenuItems((prev) => {
          prev.map((menu) => {
            if (menu.key === item.key) {
              menu.clicked = true;
            } else {
              menu.clicked = false;
            }
          });
          return [...prev];
        });
        navigate('/admin')
        break;
        case 2:
          message.warning('Tính năng đang phát triển')
          break;
      case 3:
        setMenuItems((prev) => {
          prev.map((menu) => {
            if (menu.key === item.key) {
              menu.clicked = true;
            } else {
              menu.clicked = false;
            }
          });
          return [...prev];
        });
        navigate('/admin/QLKH')
        break;
        case 4:
          message.warning('Tính năng đang phát triển')
          break;
          case 5:
            message.warning('Tính năng đang phát triển')
            break;
      case 6:
        setMenuItems((prev) => {
          prev.map((menu) => {
            if (menu.key === item.key) {
              menu.clicked = true;
            } else {
              menu.clicked = false;
            }
          });
          return [...prev];
        });
        navigate('/admin/QLLP')
        break;
    }
  };

  const renderClass = (isClicked: boolean) => {
    let className =
      "cursor-pointer hover:text-yellow-400 text-lg tracking-wide";
    if (isClicked) {
      className += " text-yellow-400";
    }
    return className;
  };

  const listMenu = menuItems.map((item) => {
    return (
      <a
        key={item.key}
        onClick={() => onClickMenu(item)}
        className={renderClass(item.clicked)}
      >
        <Space className="uppercase">{item.title}</Space>
      </a>
    );
  });

  useEffect(() => {
    // const token = localStorage.getItem("tk") || "";
    const role = localStorage.getItem("role") || "";
    // if (token.length > 0 && role == "admin") {
    //   setIsAdmin(true);
    // } else {
    //   navigate("/auth");
    //   setIsAdmin(false);
    // }
  if(role != "Admin"){
    history.back()
  }else{
    setIsAdmin(true)
  };
  })
  const App = () => {
    if (isAdmin) {
      return (
        <>
          <div className="navbaradmin flex justify-center items-center text-white gap-6">
            {listMenu}
          </div>
          <div className="p-5">
            <Outlet />
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return <div>{App()}</div>;
};
export default AdminLayout;
