import { DatabaseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  const { pathname } = useLocation();

  const sidebarItems: ItemType<MenuItemType>[] = [
    {
      key: "/datasets/add",
      label: <Link to="/datasets/add">New dataset</Link>,
      icon: createElement(PlusCircleOutlined),
    },
    {
      key: "/datasets",
      label: <Link to="/datasets">Datasets</Link>,
      icon: createElement(DatabaseOutlined),
    },
  ];

  return (
    <Sider width={200} className="sidebar" data-testid="sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        className="sidebar__menu"
        items={sidebarItems}
      />
    </Sider>
  );
}
