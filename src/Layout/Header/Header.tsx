import { Header as AntdHeader } from "antd/es/layout/layout";
import "./Header.scss";

export default function Header() {
  return (
    <AntdHeader className="header" data-testid="header">
      <p className="header__title">Image Processor</p>
    </AntdHeader>
  );
}
