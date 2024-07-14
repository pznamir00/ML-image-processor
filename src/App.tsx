import { ConfigProvider, Layout } from "antd";
import { Content as AntdContent } from "antd/es/layout/layout";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Content from "./Content/Content";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}
