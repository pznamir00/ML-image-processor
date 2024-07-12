import {
  DatabaseOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { createElement } from "react";
import "./Sidebar.scss";

export default function Sidebar() {
  const sidebarItems: ItemType<MenuItemType>[] = [
    {
      key: "1",
      label: "Home",
      icon: createElement(HomeOutlined),
    },
    {
      key: "2",
      label: "New dataset",
      icon: createElement(PlusCircleOutlined),
    },
    {
      key: "3",
      label: "Datasets",
      icon: createElement(DatabaseOutlined),
    },
  ];

  return (
    <Sider width={200} className="sidebar" data-testid="sidebar">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
        items={sidebarItems}
      />
    </Sider>
  );
}
