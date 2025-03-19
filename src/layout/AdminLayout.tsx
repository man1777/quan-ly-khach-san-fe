import { Outlet } from "react-router-dom";
import "../styles/AdminLayout.css";
import { Space } from "antd";
import { useState } from "react";
const AdminLayout = () => {
  interface menuItems {
    title: string;
    key: number;
    clicked: boolean;
  }

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
  ]);

  const onClickMenu = (item: menuItems) => {
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
    console.log("item", item);
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

  return (
    <div>
      <div className="navbaradmin flex justify-center items-center text-white gap-6">
        {listMenu}
      </div>

      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
