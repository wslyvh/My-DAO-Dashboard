import { Layout, Icon } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Route, Redirect } from "react-router";
import "./App.css";
import { store } from "./backbone/store";
import AccountComponent from "./Components/AccountComponent/AccountComponent";
import AppHeader from "./Components/Layout/AppHeader";
import DAO from "./Pages/DAO";
import Dashboard from "./Pages/Dashboard";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AccountComponent>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <AppHeader />
          </Header>
          <Content className="container">
            <div className="content">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dao/:id" component={DAO} />
              <Redirect to="/" />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <a href="https://github.com/wslyvh/My-DAO-Dashboard" target="_blank" rel="noopener noreferrer" className="text-muted">
              <Icon type="github" />
            </a> &nbsp; 
            ETHBerlin Zwei
          </Footer>
        </Layout>
      </AccountComponent>
    </Provider>
  );
};

export default App;
