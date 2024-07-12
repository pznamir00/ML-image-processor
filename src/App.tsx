import { ConfigProvider, Layout } from "antd";
import { Content as AntdContent } from "antd/es/layout/layout";
import "./App.scss";
import Content from "./Layout/Content/Content";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";

export default function App() {
  return (
    <ConfigProvider theme={{ cssVar: true }}>
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Layout className="app__container">
            <AntdContent className="app__container__content">
              <Content />
            </AntdContent>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
